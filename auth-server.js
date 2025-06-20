const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Contraseña: MiClave1234
const hashedPassword = "$2b$10$r8nPdguLUxCI4iN0fdERxuUBhN.91ElKArDAhZgAkXWWnboTuQp6C";

app.post("/auth", async (req, res) => {
  const { password } = req.body;
  const isValid = await bcrypt.compare(password, hashedPassword);
  res.json({ success: isValid });
});

app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
