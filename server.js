import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// отдаём статические файлы (твоя верстка)
app.use(express.static("public"));

// мини-API (пример, можно убрать)
const pizzas = [
  { id: "margherita", name: "Margherita" },
  { id: "fourcheese", name: "Four Cheese" },
  { id: "pepperoni", name: "Pepperoni" },
  { id: "bbq", name: "BBQ Chicken" },
  { id: "veggie", name: "Veggie Garden" }
];

app.get("/api/pizzas", (_req, res) => res.json(pizzas));

app.post("/api/order", (req, res) => {
  const { pizzaId, size = "Medium", qty = 1 } = req.body || {};
  const item = pizzas.find(p => p.id === pizzaId);
  if (!item) return res.status(400).json({ ok: false, error: "Unknown pizza" });
  res.json({ ok: true, message: `Order accepted: ${item.name} ×${qty} (${size})` });
});

// запуск сервера
app.listen(PORT, () => {
  console.log(`🍕 Server running at http://localhost:${PORT}`);
});
