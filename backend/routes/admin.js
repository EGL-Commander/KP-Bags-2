import "dotenv/config";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import pkg from "multer-storage-cloudinary";
import db from "../db.js";
import { requireAdmin } from "../middleware/auth.js";
import { products as staticProducts } from "../productsData.js";
import { defaultGalleryItems } from "../galleryData.js";

const CloudinaryStorage = pkg.CloudinaryStorage || pkg.default || pkg;

const router = express.Router();

const hasCloudinaryConfig = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (hasCloudinaryConfig) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDirectory = path.resolve(__dirname, "../../frontend/public/uploads");
fs.mkdirSync(uploadDirectory, { recursive: true });

const diskStorage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadDirectory);
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(file.originalname, extension)
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase() || "image";
    callback(null, `${Date.now()}-${baseName}${extension}`);
  },
});

const upload = multer({
  storage: diskStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
    if (allowedTypes.has(file.mimetype)) {
      callback(null, true);
      return;
    }
    callback(new Error("Only JPG, PNG, and WebP images are allowed"));
  },
});

router.post("/upload-image", requireAdmin, (req, res) => {
  upload.single("image")(req, res, async (error) => {
    if (error) {
      return res.status(400).json({ message: error.message || "Failed to process image" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const localUrl = `/uploads/${req.file.filename}`;

    if (hasCloudinaryConfig) {
      try {
        const cloudResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "kp-bags",
          resource_type: "image"
        });
        return res.json({ imageUrl: cloudResult.secure_url, publicId: cloudResult.public_id });
      } catch (cloudErr) {
        console.warn("Cloudinary upload notice (using local storage fallback):", cloudErr.message);
        return res.json({ imageUrl: localUrl, publicId: null });
      }
    }

    res.json({ imageUrl: localUrl, publicId: null });
  });
});

router.use((error, _req, res, next) => {
  if (error instanceof multer.MulterError || error.message?.includes("image")) {
    return res.status(400).json({ message: error.message });
  }
  next(error);
});

// --- Auth ---

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const admin = db.prepare("SELECT * FROM admins WHERE username = ?").get(username);
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isValid = bcrypt.compareSync(password, admin.password_hash);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: admin.id, username: admin.username },
    process.env.JWT_SECRET || "fallback_secret_key",
    { expiresIn: "1d" }
  );

  res.json({ token, username: admin.username });
});

// --- Dashboard Stats ---

router.get("/dashboard", requireAdmin, (req, res) => {
  try {
    const totalInquiries = db.prepare("SELECT COUNT(*) as count FROM inquiries").get().count;
    const newInquiries = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'new'").get().count;
    const inProgressInquiries = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'in progress'").get().count;
    const resolvedInquiries = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'resolved'").get().count;
    const todayCount = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE date(created_at) = date('now')").get().count;
    const productBreakdown = db.prepare("SELECT product_slug, COUNT(*) as count FROM inquiries GROUP BY product_slug ORDER BY count DESC LIMIT 5").all();

    res.json({ totalInquiries, newInquiries, inProgressInquiries, resolvedInquiries, todayCount, productBreakdown });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard stats", error: error.message });
  }
});

// --- Inquiries ---

router.get("/inquiries", requireAdmin, (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    let query = "SELECT * FROM inquiries WHERE 1=1";
    const params = [];

    if (status && status !== "all") {
      query += " AND status = ?";
      params.push(status);
    }
    if (search) {
      query += " AND (name LIKE ? OR email LIKE ? OR product_slug LIKE ?)";
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    const countQuery = query.replace("SELECT *", "SELECT COUNT(*) as count");
    const total = db.prepare(countQuery).get(...params).count;
    query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);
    const inquiries = db.prepare(query).all(...params);

    res.json({ inquiries, total, page: Number(page), totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch inquiries", error: error.message });
  }
});

router.get("/inquiries/:id", requireAdmin, (req, res) => {
  try {
    const inquiry = db.prepare("SELECT * FROM inquiries WHERE id = ?").get(req.params.id);
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch inquiry", error: error.message });
  }
});

router.patch("/inquiries/:id", requireAdmin, (req, res) => {
  try {
    const { status, admin_notes } = req.body;
    const inquiryId = req.params.id;
    const updates = [];
    const params = [];

    if (status !== undefined) { updates.push("status = ?"); params.push(status); }
    if (admin_notes !== undefined) { updates.push("admin_notes = ?"); params.push(admin_notes); }
    if (updates.length === 0) return res.status(400).json({ message: "No updates provided" });

    params.push(inquiryId);
    db.prepare(`UPDATE inquiries SET ${updates.join(", ")} WHERE id = ?`).run(...params);
    res.json({ message: "Inquiry updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update inquiry", error: error.message });
  }
});

router.delete("/inquiries/:id", requireAdmin, (req, res) => {
  try {
    db.prepare("DELETE FROM inquiries WHERE id = ?").run(req.params.id);
    res.json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete inquiry", error: error.message });
  }
});

// --- Products Management ---

const ensureProductsInDB = () => {
  const count = db.prepare("SELECT COUNT(*) as count FROM products").get().count;
  if (count === 0) {
    const insert = db.prepare(`INSERT INTO products (slug, name, description, category_id, category_name, image, specifications, applications) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
    const insertMany = db.transaction((productsToInsert) => {
      for (const p of productsToInsert) {
        insert.run(p.slug, p.name, p.description, p.categoryId, p.categoryName, p.image, JSON.stringify(p.specifications || {}), JSON.stringify(p.applications || []));
      }
    });
    insertMany(staticProducts);
  }
};

router.get("/products", requireAdmin, (req, res) => {
  try {
    ensureProductsInDB();
    const products = db.prepare("SELECT * FROM products ORDER BY category_id, name").all();
    const formattedProducts = products.map(p => ({ ...p, specifications: p.specifications ? JSON.parse(p.specifications) : {}, applications: p.applications ? JSON.parse(p.applications) : [] }));
    res.json(formattedProducts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
});

router.post("/products", requireAdmin, (req, res) => {
  try {
    const { slug, name, description, category_id, category_name, image, specifications, applications } = req.body;
    db.prepare(`INSERT INTO products (slug, name, description, category_id, category_name, image, specifications, applications) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).run(slug, name, description, category_id, category_name, image, JSON.stringify(specifications || {}), JSON.stringify(applications || []));
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
});

router.put("/products/:slug", requireAdmin, (req, res) => {
  try {
    const { name, description, category_id, category_name, image, specifications, applications } = req.body;
    db.prepare(`UPDATE products SET name=?, description=?, category_id=?, category_name=?, image=?, specifications=?, applications=? WHERE slug=?`).run(name, description, category_id, category_name, image, JSON.stringify(specifications || {}), JSON.stringify(applications || []), req.params.slug);
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
});

router.delete("/products/:slug", requireAdmin, (req, res) => {
  try {
    db.prepare("DELETE FROM products WHERE slug = ?").run(req.params.slug);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
});

// --- Gallery Management ---

const ensureGalleryInDB = () => {
  const count = db.prepare("SELECT COUNT(*) as count FROM gallery").get().count;
  if (count === 0) {
    const insert = db.prepare(`INSERT INTO gallery (type, title, desc, src, alt) VALUES (?, ?, ?, ?, ?)`);
    const insertMany = db.transaction((items) => {
      for (const item of items) insert.run(item.type, item.title, item.desc, item.src, item.alt);
    });
    insertMany(defaultGalleryItems);
  }
};

router.get("/gallery", requireAdmin, (req, res) => {
  try {
    ensureGalleryInDB();
    const items = db.prepare("SELECT * FROM gallery ORDER BY created_at DESC").all();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch gallery", error: error.message });
  }
});

router.post("/gallery", requireAdmin, (req, res) => {
  try {
    const { type, title, desc, src, alt } = req.body;
    db.prepare(`INSERT INTO gallery (type, title, desc, src, alt) VALUES (?, ?, ?, ?, ?)`).run(type, title, desc, src, alt);
    res.status(201).json({ message: "Gallery item created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create gallery item", error: error.message });
  }
});

router.put("/gallery/:id", requireAdmin, (req, res) => {
  try {
    const { type, title, desc, src, alt } = req.body;
    db.prepare(`UPDATE gallery SET type=?, title=?, desc=?, src=?, alt=? WHERE id=?`).run(type, title, desc, src, alt, req.params.id);
    res.json({ message: "Gallery item updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update gallery item", error: error.message });
  }
});

router.delete("/gallery/:id", requireAdmin, (req, res) => {
  try {
    db.prepare("DELETE FROM gallery WHERE id = ?").run(req.params.id);
    res.json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete gallery item", error: error.message });
  }
});

export default router;
