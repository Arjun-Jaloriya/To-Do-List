const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 5000;
const connectDB = require("./Config/Db");
const taskRoutes = require("./Routes/TaskRoutes");

connectDB();
//set middlewares
app.use(cors());
app.use(express.json());

//set routes
app.use("/api/task",taskRoutes)

//app listen on port
app.listen(PORT, () => {
  console.log(`app is live on port ${PORT}`);
});
