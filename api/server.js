import cors from "cors";
import express from "express";
import testRouter from "./routes/test.js"

const app = express();
const port = 3001;

app.use(cors());

app.use("/api/test",testRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
