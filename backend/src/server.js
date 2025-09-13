import express from "express";
import taskRoute from "./routes/tasksRouters.js";
import { connectDB } from "./config/database.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve(); 

const app = express();

// middlewares
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

app.use("/api/tasks", taskRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../fontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../fontend/dist/index.html"));
  });
}

//kết nối database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`bat dau ${PORT}`);
  });
});
