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
  password: "abdulla43005",
  database: "task_management",
});

app.get("/", (req, res) => {
  const allTasks = "SELECT * FROM task";
  db.query(allTasks, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.post("/create", (req, res) => {
  const addTask = "INSERT INTO task (`task`, `detail`, `date`) VALUES (?)";
  const values = [
    req.body.taskTitle,
    req.body.taskDetails,
    req.body.selectedDate.split("T")[0],
  ];
  db.query(addTask, [values], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.put("/update/:id", (req, res) => {
  const updateTask =
    "update task set `task`=? , `detail`=?, `date`=? where id=?";
  const values = [
    req.body.taskTitle,
    req.body.taskDetails,
    req.body.selectedDate.split("T")[0],
  ];
  const id = req.params.id;
  db.query(updateTask, [...values, id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.delete("/task/:id", (req, res) => {
  const deleteTask = "DELETE FROM task where id=?";

  const id = req.params.id;
  db.query(deleteTask, [id], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
