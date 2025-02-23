import "./config.mjs";
import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from "url";
import homeRouter from "./routes/homeRouter.mjs";
import productsRouter from "./routes/productsRouter.mjs";
import methodOverride from "method-override";
import salesRouter from "./routes/salesRouter.mjs";
import suppliersRouter from "./routes/suppliersRouter.mjs";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressLayouts);
app.set("layout", "layout");

app.use("/", homeRouter);
app.use("/products", productsRouter);
app.use("/sales", salesRouter);
app.use("/suppliers", suppliersRouter);

// app.get("/crash", (req, res, next) => {
//   throw new Error("Unexpected server crash!");
// });

app.use((req, res, next) => {
  res.status(404).render("404", { title: "404 Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .send("Error: " + (err.message || "Something went wrong!"));
});

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging purposes

  // Set the status code to the error's status, or default to 500
  const statusCode = err.status || 500;

  // Check if the request expects a JSON response (e.g., for an API endpoint)
  if (req.accepts("json")) {
    // Send a JSON response with the error details
    return res.status(statusCode).json({
      status: "error",
      message: err.message || "Something went wrong!",
      stack: process.env.NODE_ENV === "development" ? err.stack : null, // Show stack trace only in development
    });
  }

  // Otherwise, render an error page (for front-end users)
  res.status(statusCode).render("errors", {
    title: `Error ${statusCode}`,
    message: err.message || "Something went wrong!",
    stack: process.env.NODE_ENV === "development" ? err.stack : null, // Show stack trace only in development
  });
});

const PORT = process.env.PORT || 3080;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
