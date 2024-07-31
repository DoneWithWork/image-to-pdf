import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

//image upload
const __filename = fileURLToPath(import.meta.url); //getting the current dir of the this file
const __dirname = path.dirname(__filename); //getting the parent directory of the current file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
//configuration for file filter
let fileFilter = (req, file, callback) => {
  let ext = path.extname(file.originalname);
  //if the file extension isn't '.png' or '.jpg' return an error page else return true
  if (ext !== ".png" && ext !== ".jpg") {
    return callback(new Error("Only png and jpg files are accepted"));
  } else {
    return callback(null, true);
  }
};

//initialize Multer with the configurations for storage and file filter
const upload = multer({ storage, fileFilter: fileFilter });

const uploadMultiple = upload.array("images", 10);
export default uploadMultiple;
