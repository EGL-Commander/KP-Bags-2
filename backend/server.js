import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import dns from "dns";
import db from "./db.js";
import { products } from "./productsData.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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
      message: "Please fill all required fields."
    });
  }

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

    const { address: smtpIPv4 } = await dns.promises.lookup(process.env.SMTP_HOST, { family: 4 });

    const transporter = nodemailer.createTransport({
      host: smtpIPv4,
      port: process.env.SMTP_PORT,
      secure: false,
      tls: {
        servername: process.env.SMTP_HOST // keeps TLS cert validation matched to the real hostname
      },
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.COMPANY_EMAIL,
      replyTo: email,
      subject: `New Product Inquiry - ${productSlug}`,
      text: `
New B2B Product Inquiry

Product: ${productSlug}

Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company || "N/A"}
Quantity: ${quantity || "N/A"}

Requirements:
${message}
      `
    });

    res.json({
      success: true,
      message: "Inquiry submitted successfully."
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong while submitting the inquiry."
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend running on port ${process.env.PORT || 5000}`);
});