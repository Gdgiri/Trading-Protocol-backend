import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(cors());
app.use(bodyParser.json());

let transactions = []; // Store last 3 transactions

app.post("/api/transaction", async (req, res) => {
  const { name, price, status } = req.body;

  // Store only the last 3 transactions
  if (transactions.length >= 3) transactions.shift();
  transactions.push({ name, price, status });

  console.log("Updated Transactions:", transactions);

  try {
    await axios.post(
      "https://trading-protocol-website2.onrender.com/api/transactions",
      {
        transactions,
      }
    );
    res.status(200).json({ message: "Transaction sent!", transactions });
  } catch (error) {
    console.error("Error sending transaction:", error);
    res.status(500).json({ message: "Error sending transaction" });
  }
});

app.get("/api/transactions", (req, res) => {
  res.json({ transactions });
});

app.listen(5000, () =>
  console.log("🚀 Website 1 Backend running on port 5000")
);
