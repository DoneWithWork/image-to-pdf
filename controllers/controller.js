import expressAsyncHandler from "express-async-handler";
import uploadMultiple from "../utils/Upload.js";
import multer from "multer";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import PDFDocument from "pdfkit";
import { error } from "console";
const __filename = fileURLToPath(import.meta.url); //getting the current dir of the this file
const __dirname = path.dirname(__filename); //getting the parent directory of the current file
export const Home = expressAsyncHandler(async (req, res) => {
  if (req.session.imgNames) {
    res.render("Home", {
      images: req.session.imgNames,
      title: "Home",
      message: "",
      error: "",
    });
  } else {
    res.render("Home", {
      images: [],
      title: "Home",
      message: "",
      error: "",
    });
  }
});
export const Upload = expressAsyncHandler(async (req, res) => {
  uploadMultiple(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.render("Home", {
        images: [],
        title: "Home",
        message: "",
        error: "Only png and jpg files are accepted",
      });
    } else {
      // Initialize imgNames array if it does not exist
      if (!req.session.imgNames) {
        req.session.imgNames = [];
      }

      const imgNames = req.files.map((file) => file.filename);
      req.session.imgNames = req.session.imgNames.concat(imgNames); // Concatenate new filenames to the existing array

      res.redirect("/");
    }
  });
});
export const Convert = expressAsyncHandler(async (req, res) => {
  let body = req.body;

  //Create a new pdf
  let doc = new PDFDocument({ size: "A4", autoFirstPage: false });
  let pdfName = "pdf-" + Date.now() + ".pdf";

  //store the pdf in the public/pdf folder
  doc.pipe(
    fs.createWriteStream(path.join(__dirname, "..", `/public/pdf/${pdfName}`))
  );

  //create the pdf pages and add the images
  for (let name of body) {
    doc.addPage();
    doc.image(path.join(__dirname, "..", `/public/images/${name}`), 20, 20, {
      width: 555.28,
      align: "center",
      valign: "center",
    });
  }
  //end the process
  doc.end();

  //send the address back to the browser
  res.send(`/pdf/${pdfName}`);
});
export const Delete = expressAsyncHandler(async (req, res) => {
  const imgNames = req.session.imgNames;
  console.log(imgNames);
  for (let img of imgNames) {
    fs.unlink(`${path.join(__dirname, `../public/images/${img}`)}`, (err) => {
      if (err) {
        return console.log(err);
      }
    });
  }
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect("/");
  });
});
