import expressAsyncHandler from "express-async-handler";
import uploadMultiple from "../utils/Upload.js";
import multer from "multer";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url); //getting the current dir of the this file
const __dirname = path.dirname(__filename); //getting the parent directory of the current file
export const Home = expressAsyncHandler(async (req, res) => {
  if (req.session.imgNames) {
    res.render("Home", {
      images: req.session.imgNames,
      title: "Home",
      message: "Images uploaded successfully",
    });
  } else {
    res.render("Home", {
      images: [],
      title: "Home",
      message: "",
    });
  }
});
export const Upload = expressAsyncHandler(async (req, res) => {
  uploadMultiple(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.redirect("/");
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
