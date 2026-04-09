import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cors from "cors";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { GoogleGenerativeAI } from "@google/generative-ai";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// ===== DATABASE =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.error("DB Connection Error:", err));

// ===== MODELS =====
const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
}, { timestamps: true }));

const Resource = mongoose.model("Resource", new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  tags: [String],
  fileUrl: String,
  fileType: String,
  hashcode: { type: String, unique: true },
  textContent: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true }));

// ===== AUTH MIDDLEWARE =====
const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json("No token provided");

  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : header;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json("Invalid or expired token");
  }
};

// ===== MULTER CONFIG =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("uploads/")) {
      fs.mkdirSync("uploads/");
    }
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword"
    ];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only PDF and DOCX files are allowed"), false);
  }
});

// ===== UTILS =====
const generateHash = () => uuidv4().slice(0, 8);

const extractText = async (filePath, mimetype) => {
  try {
    if (!fs.existsSync(filePath)) {
      console.error("File not found at:", filePath);
      return "";
    }

    let text = "";

    if (mimetype === "application/pdf") {
      const data = new Uint8Array(fs.readFileSync(filePath));
      const doc = await pdfjsLib.getDocument({ data }).promise;
      const pages = [];

      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(" ");
        pages.push(pageText);
      }

      text = pages.join("\n");
    } else if (mimetype.includes("wordprocessingml") || mimetype.includes("msword")) {
      const buffer = fs.readFileSync(filePath);
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    }

    const cleanText = text ? text.replace(/\s+/g, " ").trim() : "";
    console.log(`Extracted ${cleanText.length} chars | Snippet: "${cleanText.substring(0, 80)}"`);
    return cleanText;

  } catch (err) {
    console.error("EXTRACT ERROR:", err.message);
    return "";
  }
};

// ===== AI CONFIG =====
import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ===== ROUTES =====

// AUTH: Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json("Wrong password");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// RESOURCE: Upload
app.post("/api/resource/upload", auth, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json("No file uploaded");

    const { title, description, tags } = req.body;
    const text = await extractText(req.file.path, req.file.mimetype);

    const resource = await Resource.create({
      user: req.user.id,
      title,
      description,
      tags: tags ? tags.split(",").map(t => t.trim()) : [],
      fileUrl: req.file.path,
      fileType: req.file.mimetype,
      hashcode: generateHash(),
      textContent: text
    });

    res.json(resource);
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json(err.message);
  }
});

// RESOURCE: Get All
app.get("/api/resource", async (req, res) => {
  const data = await Resource.find().populate("user", "name").sort({ createdAt: -1 });
  res.json(data);
});

// RESOURCE: Get One
app.get("/api/resource/:id", async (req, res) => {
  try {
    const data = await Resource.findById(req.params.id).populate("user", "name");
    if (!data) return res.status(404).json("Not found");
    res.json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// RESOURCE: Delete
app.delete("/api/resource/:id", auth, async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json("Resource not found");
    if (resource.user.toString() !== req.user.id) return res.status(403).json("Unauthorized");

    if (fs.existsSync(resource.fileUrl)) fs.unlinkSync(resource.fileUrl);
    await Resource.findByIdAndDelete(req.params.id);

    res.json("Resource deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// INTERACTION: Comment
app.post("/api/resource/comment/:id", auth, async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    resource.comments.push({ user: req.user.id, text: req.body.text });
    await resource.save();
    res.json(resource);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// INTERACTION: Like/Unlike
app.post("/api/resource/like/:id", auth, async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    const index = resource.likes.indexOf(req.user.id);
    if (index === -1) resource.likes.push(req.user.id);
    else resource.likes.splice(index, 1);
    await resource.save();
    res.json(resource);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// AI: Chat with Resource
// CHAT ROUTE
app.post("/api/chat", async (req, res) => {
  try {
    const { hashcode, question } = req.body;
    const resource = await Resource.findOne({ hashcode });

    if (!resource) return res.status(404).json("Resource not found");
    if (!resource.textContent || resource.textContent.trim().length < 20) {
      return res.json({ answer: "Chat not supported for this file." });
    }

    const contextWindow = resource.textContent.slice(0, 15000);

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // best free model on Groq
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant. Answer questions based ONLY on the provided document context. If the answer is not in the context, say 'I cannot find this information in the document.'"
        },
        {
          role: "user",
          content: `Document context:\n${contextWindow}\n\nQuestion: ${question}`
        }
      ],
      max_tokens: 1024,
    });

    const answer = completion.choices[0]?.message?.content || "No response generated.";
    res.json({ answer });

  } catch (err) {
    console.error("CHAT ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ===== GLOBAL ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  if (err instanceof multer.MulterError) return res.status(400).json(err.message);
  res.status(400).json(err.message || "Internal Server Error");
});

// DEBUG: Check what textContent is saved for a resource
app.get("/api/debug/resource/:hashcode", async (req, res) => {
  const resource = await Resource.findOne({ hashcode: req.params.hashcode });
  if (!resource) return res.status(404).json("Not found");
  res.json({
    title: resource.title,
    textContentLength: resource.textContent?.length || 0,
    snippet: resource.textContent?.substring(0, 200) || "EMPTY"
  });
});

app.post("/api/debug/extract", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json("No file");

  const buffer = fs.readFileSync(req.file.path);

  try {
    const data = await pdfParse(buffer);
    res.json({
      pages: data.numpages,
      textLength: data.text.length,
      snippet: data.text.substring(0, 300),
      info: data.info
    });
  } catch (err) {
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

app.get("/api/debug/pdftest", async (req, res) => {
  try {
    // List all files in uploads folder
    const files = fs.readdirSync("uploads/");
    res.json({ files });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/debug/pdfextract/:filename", async (req, res) => {
  try {
    const filePath = `uploads/${req.params.filename}`;
    console.log("Testing file:", filePath);
    console.log("Exists:", fs.existsSync(filePath));

    const data = new Uint8Array(fs.readFileSync(filePath));
    console.log("Buffer size:", data.length);

    const doc = await pdfjsLib.getDocument({ data }).promise;
    console.log("Total pages:", doc.numPages);

    let fullText = "";
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => item.str).join(" ");
      console.log(`Page ${i} text length:`, pageText.length);
      fullText += pageText + "\n";
    }

    res.json({
      pages: doc.numPages,
      totalLength: fullText.length,
      snippet: fullText.substring(0, 300) || "EMPTY"
    });
  } catch (err) {
    console.error("PDF TEST ERROR:", err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

app.post("/api/debug/reextract/:hashcode", async (req, res) => {
  try {
    const resource = await Resource.findOne({ hashcode: req.params.hashcode }); // ✅ findOne by hashcode
    if (!resource) return res.status(404).json("Not found");

    console.log("Re-extracting from:", resource.fileUrl);
    const text = await extractText(resource.fileUrl, resource.fileType);

    resource.textContent = text;
    await resource.save();

    res.json({
      success: true,
      extractedLength: text.length,
      snippet: text.substring(0, 200) || "STILL EMPTY"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== START SERVER =====
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
