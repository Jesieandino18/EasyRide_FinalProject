import express from "express";
import driverRoutes from "./routes/driverRoutes.js";

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json({ limit: "16kb" }));

app.use("/driver", driverRoutes);

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const statusCode =
    error.statusCode || error.status || 500;

  if (statusCode >= 500) {
    console.error("Registration error:", error);
  }

  return res.status(statusCode).json({
    message:
      statusCode >= 500
        ? "Unable to process registration. Check the backend terminal."
        : error.message,
  });
});

const server = app.listen(port, "127.0.0.1", () => {
  console.log(
    "EASYRIDE Backend: http://127.0.0.1:" + port
  );
});

server.on("error", (error) => {
  console.error("Backend failed to start:", error.message);
  process.exitCode = 1;
});