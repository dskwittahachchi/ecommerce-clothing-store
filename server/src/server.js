import mongoose from "mongoose";
import { app } from "./app.js";
import { env } from "./config/env.js";

if (env.mongoUri) {
  await mongoose.connect(env.mongoUri);
  console.log("MongoDB connected.");
} else {
  console.log("MONGODB_URI not set — running with the seeded in-memory demo store.");
}

app.listen(env.port, () => {
  console.log(`Élan Atelier API running at http://localhost:${env.port}`);
});
