import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import errorHandler from "./middlewares/middleware.js";
import router from "./routes/routes.js";
const app = express();

const __filename = fileURLToPath(import.meta.url); //getting the current dir of the this file
const __dirname = path.dirname(__filename); //getting the parent directory of the current file
app.use(express.static(__dirname + "/public")); //server static assets like css and images from this route

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//setting the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(
  session({
    secret: "YOUR_SECRET",
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/", router);
app.use(errorHandler);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
