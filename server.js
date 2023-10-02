import express from "express";

const app = express();
const port = 8081;

app.get("/", (req, res) => {
  res.json("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
