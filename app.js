
const express = require("express");
var logger = require("morgan");
const dotenv = require('dotenv');
const todoRouter = require("./routes/todo.routes");
const mongoDb = require("./configs/mongoose.config")

const app = express();
dotenv.config();
mongoDb.connect();

app.use(express.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.use("/todos", todoRouter);

app.listen(process.env.PORT || 3000, ()=>{
  console.log("server is running");
})

module.exports = app;
