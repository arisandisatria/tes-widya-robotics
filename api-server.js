import app from "./api.js";
import { PORT } from "./config.js";
import startServer from "./server.js";

startServer(app, PORT);
