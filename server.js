import express, { json } from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const port = 8081;
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "task_management",
});

app.get("/", (req, res) => {
  const allTasks = "SELECT * FROM task";
  db.query(allTasks, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
