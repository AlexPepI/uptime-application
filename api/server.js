import cors from "cors";
import express from "express";
import sync from "./config/sync.js";
import testRouter from "./routes/test.js"

const app = express();
app.use(express.json());
const port = 3001;

app.use(cors());
sync();

app.use("/api/test",testRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
