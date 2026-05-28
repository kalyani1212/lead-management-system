const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* Add Lead */
app.post("/leads", (req, res) => {

  const { name, phone, source } = req.body;

  if (!name || !phone || !source) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const sql =
    "INSERT INTO leads (name, phone, source) VALUES (?, ?, ?)";

  db.query(sql, [name, phone, source], (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).json("Database Error");
    } else {
      res.json({
        message: "Lead Added Successfully",
      });
    }

  });

});

/* Get All Leads */
app.get("/leads", (req, res) => {

  const sql = "SELECT * FROM leads ORDER BY id DESC";

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).json("Database Error");
    } else {
      res.json(result);
    }

  });

});

/* Update Lead Status */
app.put("/leads/:id", (req, res) => {

  const { id } = req.params;
  const { status } = req.body;

  const sql =
    "UPDATE leads SET status=? WHERE id=?";

  db.query(sql, [status, id], (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).json("Database Error");
    } else {
      res.json("Lead status updated");
    }

  });

});

/* Delete Lead */
app.delete("/leads/:id", (req, res) => {

  const { id } = req.params;

  const sql =
    "DELETE FROM leads WHERE id=?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).json("Database Error");
    } else {
      res.json("Lead deleted");
    }

  });

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});