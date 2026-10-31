import mongoose from "mongoose";
import { mongoDBURL, PORT } from "./config.js";

const startServer = async (app, port = PORT) => {
  try {
    await mongoose.connect(mongoDBURL);

    console.log("App connected to database!");

    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

export default startServer;
