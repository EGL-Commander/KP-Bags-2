import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import db from "../db.js";
import { requireAdmin } from "../middleware/auth.js";
import { products as staticProducts } from "../productsData.js";

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Save to frontend public folder so it can be served directly
    cb(null, path.join(process.cwd(), '../frontend/public'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'uploads/' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.post("/upload-image", requireAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }
  // The URL path to save in the DB (relative to public folder)
  const imageUrl = `/${req.file.filename}`;
  res.json({ imageUrl });
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
    
    // Inquiries today
    const todayCount = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE date(created_at) = date('now')").get().count;

    // Breakdown by product
    const productBreakdown = db.prepare("SELECT product_slug, COUNT(*) as count FROM inquiries GROUP BY product_slug ORDER BY count DESC LIMIT 5").all();

    res.json({
      totalInquiries,
      newInquiries,
      inProgressInquiries,
      resolvedInquiries,
      todayCount,
      productBreakdown
    });
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

    if (status && status !== 'all') {
      query += " AND status = ?";
      params.push(status);
    }

    if (search) {
      query += " AND (name LIKE ? OR email LIKE ? OR product_slug LIKE ?)";
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    // Count total for pagination
    const countQuery = query.replace("SELECT *", "SELECT COUNT(*) as count");
    const total = db.prepare(countQuery).get(...params).count;

    query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const inquiries = db.prepare(query).all(...params);

    res.json({
      inquiries,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit)
    });
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

    if (status !== undefined) {
      updates.push("status = ?");
      params.push(status);
    }
    
    if (admin_notes !== undefined) {
      updates.push("admin_notes = ?");
      params.push(admin_notes);
    }

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

// --- Products Management (DB Migration logic) ---

// Helper to ensure products are migrated to DB
const ensureProductsInDB = () => {
  const count = db.prepare("SELECT COUNT(*) as count FROM products").get().count;
  if (count === 0) {
    const insert = db.prepare(`
      INSERT INTO products (slug, name, description, category_id, category_name, image, specifications, applications) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const insertMany = db.transaction((productsToInsert) => {
      for (const p of productsToInsert) {
        insert.run(
          p.slug, 
          p.name, 
          p.description, 
          p.categoryId, 
          p.categoryName, 
          p.image, 
          JSON.stringify(p.specifications || {}), 
          JSON.stringify(p.applications || [])
        );
      }
    });
    
    insertMany(staticProducts);
  }
};

router.get("/products", requireAdmin, (req, res) => {
  try {
    ensureProductsInDB();
    const products = db.prepare("SELECT * FROM products ORDER BY category_id, name").all();
    
    // Parse JSON strings back to objects
    const formattedProducts = products.map(p => ({
      ...p,
      specifications: p.specifications ? JSON.parse(p.specifications) : {},
      applications: p.applications ? JSON.parse(p.applications) : []
    }));
    
    res.json(formattedProducts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
});

router.post("/products", requireAdmin, (req, res) => {
  try {
    const { slug, name, description, category_id, category_name, image, specifications, applications } = req.body;
    
    db.prepare(`
      INSERT INTO products (slug, name, description, category_id, category_name, image, specifications, applications) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      slug, 
      name, 
      description, 
      category_id, 
      category_name, 
      image, 
      JSON.stringify(specifications || {}), 
      JSON.stringify(applications || [])
    );
    
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
});

router.put("/products/:slug", requireAdmin, (req, res) => {
  try {
    const { name, description, category_id, category_name, image, specifications, applications } = req.body;
    
    db.prepare(`
      UPDATE products 
      SET name=?, description=?, category_id=?, category_name=?, image=?, specifications=?, applications=? 
      WHERE slug=?
    `).run(
      name, 
      description, 
      category_id, 
      category_name, 
      image, 
      JSON.stringify(specifications || {}), 
      JSON.stringify(applications || []),
      req.params.slug
    );
    
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

const defaultGalleryItems = [
  { type: 'bags', title: 'Type-A Standard FIBC Bags', desc: 'Heavy-duty 1000kg load capacity standard bags stored in warehouse.', src: '/fibc-type-a.jpeg', alt: 'Type-A standard FIBC jumbo bag' },
  { type: 'bags', title: 'Baffle Q-Bags Stack', desc: 'Baffle bags maintaining neat square profiles under test loads.', src: '/baffle-bag.jpeg', alt: 'Baffle FIBC Q-bag diagram' },
  { type: 'bags', title: 'Ventilated Agricultural Bags', desc: 'Ventilated FIBC bags packed with crops showing breathability strips.', src: '/Ventilated Agricultural Bags.png', alt: 'Ventilated mesh FIBC bags' },
  { type: 'factory', title: 'High-Speed Circular Looms', desc: 'Weaving area with circular looms running PP spools continuously.', src: '/high-speed-circular-loom.jpg', alt: 'High-speed circular looms' },
  { type: 'factory', title: 'Tape Extrusion Extruder', desc: 'Polypropylene melt extrusion and slitting line winding tape rolls.', src: '/Tape Extrusion Extruder.png', alt: 'Tape extrusion line' },
  { type: 'factory', title: 'Positive Pressure Sew Block', desc: 'Cleanroom sewing lines with HEPA filtration and personnel hoods.', src: '/Positive Pressure Sew Block.png', alt: 'Cleanroom sewing line' },
  { type: 'testing', title: 'Tensile Strength Test Bench', desc: 'Calibrated electronic mechanical tester testing loop seam breakage.', src: '/Tensile Strength Test Bench.png', alt: 'Tensile strength testing' },
  { type: 'testing', title: 'UV Weather-Ometer Cabinet', desc: 'Accelerated solar exposure chambers testing fabric UV retention.', src: '/UV Weather-Ometer Cabinet.png', alt: 'UV weather-ometer' },
  { type: 'shipping', title: 'Container Stuffing Dock', desc: 'Loading pallets of vacuum-compressed jumbo bags into export containers.', src: '/Container Stuffing Dock.png', alt: 'Container stuffing' }
];

const ensureGalleryInDB = () => {
  const count = db.prepare("SELECT COUNT(*) as count FROM gallery").get().count;
  if (count === 0) {
    const insert = db.prepare(`
      INSERT INTO gallery (type, title, desc, src, alt) 
      VALUES (?, ?, ?, ?, ?)
    `);
    const insertMany = db.transaction((items) => {
      for (const item of items) {
        insert.run(item.type, item.title, item.desc, item.src, item.alt);
      }
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
    db.prepare(`
      INSERT INTO gallery (type, title, desc, src, alt) 
      VALUES (?, ?, ?, ?, ?)
    `).run(type, title, desc, src, alt);
    res.status(201).json({ message: "Gallery item created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create gallery item", error: error.message });
  }
});

router.put("/gallery/:id", requireAdmin, (req, res) => {
  try {
    const { type, title, desc, src, alt } = req.body;
    db.prepare(`
      UPDATE gallery 
      SET type=?, title=?, desc=?, src=?, alt=? 
      WHERE id=?
    `).run(type, title, desc, src, alt, req.params.id);
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
