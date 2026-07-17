import http from "http";
import app from "./app.js";
import { testToConnect } from "./config/pool.js";
import { frontendUrl } from "./lib/getUrl.js";

const PORT = process.env.PORT;

async function startServer() {
  await testToConnect();

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`Server running in port http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
