const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

dotenv.config();

// MONGODB CONNECTION
connectDB();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/test", require("./routes/testRoute.js"));
app.use("/api/v1/auth", require("./routes/authRoutes.js"));
app.use("/api/v1/inventory", require("./routes/inventoryRoute.js"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes.js"));
app.use("/api/v1/admin", require("./routes/adminRoutes.js"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
