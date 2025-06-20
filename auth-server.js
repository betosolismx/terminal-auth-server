const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Contraseña original: MiClave1234
const hashedPassword = "$2b$10$r8nPdguLUxCI4iN0fdERxuUBhN.91ElKArDAhZgAkXWWnboTuQp6C";

app.post("/auth", async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ success: false, error: "No se envió contraseña" });
  }

  try {
    const isValid = await bcrypt.compare(password, hashedPassword);
    res.json({ success: isValid });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
});

// ✅ Render usa un puerto dinámico en process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
