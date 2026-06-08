import http from "http";
import app from "./app.js";

const PORT = process.env.PORT;
const URI = process.env.MONGO_URI;

async function startServer() {
  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`Server running in port http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
