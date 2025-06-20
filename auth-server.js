const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Contraseña original: MiClave1234 (hasheada con bcrypt)
const hashedPassword = "$2b$10$r8nPdguLUxCI4iN0fdERxuUBhN.91ElKArDAhZgAkXWWnboTuQp6C";

app.post("/auth", async (req, res) => {
  const { password } = req.body;

  // Validación simple (por si password viene vacío)
  if (!password) {
    return res.status(400).json({ success: false, error: "No se envió contraseña" });
  }

  try {
    const isValid = await bcrypt.compare(password, hashedPassword);
    res.json({ success: isValid });
  } catch (err) {
    console.error("Error al verificar contraseña:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
});

// 👇 Esencial para que Render inicie el servidor
app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
