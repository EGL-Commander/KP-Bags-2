import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import db from "./db.js";
import { products } from "./productsData.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:slug", (req, res) => {
  const product = products.find(
    (p) => p.slug === req.params.slug
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json(product);
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

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
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