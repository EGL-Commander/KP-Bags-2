import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import db from "./db.js";
import { products } from "./productsData.js";
import adminRoutes from "./routes/admin.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.resolve(__dirname, "../frontend/public/uploads");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadsPath));

app.use("/api/admin", adminRoutes);

app.get("/api/products", (req, res) => {
  try {
    const products = db.prepare("SELECT * FROM products ORDER BY category_id, name").all();
    const formattedProducts = products.map(p => ({
      ...p,
      categoryId: p.category_id,
      categoryName: p.category_name,
      specifications: p.specifications ? JSON.parse(p.specifications) : {},
      applications: p.applications ? JSON.parse(p.applications) : []
    }));
    res.json(formattedProducts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

app.get("/api/products/:slug", (req, res) => {
  try {
    const product = db.prepare("SELECT * FROM products WHERE slug = ?").get(req.params.slug);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const formattedProduct = {
      ...product,
      categoryId: product.category_id,
      categoryName: product.category_name,
      specifications: product.specifications ? JSON.parse(product.specifications) : {},
      applications: product.applications ? JSON.parse(product.applications) : []
    };

    res.json(formattedProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

app.get("/api/gallery", (req, res) => {
  try {
    const items = db.prepare("SELECT * FROM gallery ORDER BY created_at DESC").all();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch gallery" });
  }
});

app.post("/api/inquiries", async (req, res) => {
  const {
    productSlug,
    name,
    email,
    phone,
    company,
    quantity,
    message
  } = req.body;

  if (!productSlug || !name || !email || !phone || !message) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields."
    });
  }

  // 1. Save to database first (critical step)
  try {
    db.prepare(`
      INSERT INTO inquiries
      (product_slug, name, email, phone, company, quantity, message)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      productSlug,
      name,
      email,
      phone,
      company || "",
      quantity || "",
      message
    );
  } catch (dbError) {
    console.error("DB save failed:", dbError);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while submitting the inquiry."
    });
  }

  // 2. Try sending email via SMTP (non-blocking — inquiry is already saved)
  try {
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER || "sales@kpbigbags.com";
    const smtpPass = process.env.SMTP_PASS || "aogwripjwsyfqtfv";
    const companyEmail = process.env.COMPANY_EMAIL || "sales@kpbigbags.com";

    if (smtpUser && smtpPass) {
      const isGmail = smtpHost.includes("gmail") || smtpUser.endsWith("@gmail.com") || smtpUser.endsWith("@kpbigbags.com");

      const transportOptions = isGmail
        ? {
            service: "gmail",
            auth: {
              user: smtpUser,
              pass: smtpPass
            },
            tls: {
              rejectUnauthorized: false
            }
          }
        : {
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
              user: smtpUser,
              pass: smtpPass
            },
            tls: {
              rejectUnauthorized: false
            }
          };

      const transporter = nodemailer.createTransport(transportOptions);

      await transporter.sendMail({
        from: smtpUser,
        to: companyEmail,
        replyTo: email,
        subject: `New B2B Inquiry - ${productSlug}`,
        text: `
New B2B Product Inquiry

Product/Subject: ${productSlug}

Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company || "N/A"}
Quantity: ${quantity || "N/A"}

Requirements / Message:
${message}
        `
      });

      console.log("Email sent successfully for inquiry:", productSlug);
    } else {
      console.warn("SMTP credentials missing — skipping email notification");
    }
  } catch (emailError) {
    // SMTP failure should NOT block the inquiry response
    console.error("SMTP email notification notice:", emailError.message);
  }

  // 3. Always return success since DB save succeeded
  res.json({
    success: true,
    message: "Inquiry submitted successfully."
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend running on port ${process.env.PORT || 5000}`);
});