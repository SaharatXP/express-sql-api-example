const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const conn = require("../config/db");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();

router.post("/register", async (req, res) => {
  const q = await conn();
  const { name, email, password, username } = req.body;
  // console.log(req.body);

  const [rows] = await q.query(
    "SELECT * FROM users WHERE email = ? OR username = ?",
    [email, username]
  );
  if (rows.length) {
    // console.log(rows);
    return res
      .status(400)
      .send({ message: "Email or Username is already registered" });
  }

  // Hash the password
  const hash = await bcrypt.hash(password, 10);
  // 10 = salt (การสุ่มค่าเพื่อเพิ่มความซับซ้อนในการเข้ารหัส)
  // และมันจะถูกนำมาใช้ตอน compare

  // Store the user data
  const userData = { name, email, username, password: hash };

  try {
    const result = await q.query("INSERT INTO users SET ?", userData);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "insert fail",
      error,
    });
  }

  res.status(201).send({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const secret = "devshrx1";
  const q = await conn();
  const { username, password } = req.body;

  const [result] = await q.query(
    "SELECT * from users WHERE username = ?",
    username
  );
  const user = result[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).send({ message: "Invalid username or password" });
  }
  const token = jwt.sign(
    { username, role: user.role, name: user.name },
    secret,
    {
      expiresIn: "12h",
    }
  );

  res.send({ message: "Login successful", token: token });
});

module.exports = router;
