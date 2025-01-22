import "dotenv/config";
import express from "express";
import cors from "cors";
import users from "./routes/user-routes.js"
import habits from "./routes/habits-routes.js"
import friends from "./routes/friend-routes.js"

//tasks
// [] incoming data validation
// [] set up all the routes
// [] implement and test end points

const app = express();
const PORT = process.env.PORT || 5050;

//middleware
app.use(cors());
app.use(express.json());


// basic home route
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// routes
app.use("/users", users);
app.use("/habits", habits);
app.use("/friends", friends);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT} 🚀`);
});