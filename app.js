const express = require("express");
const path = require("path");
const app = express();

const authorRouter = require("./routes/authorRouter");
const userRouter = require("./routes/userRouter");
const indexRouter = require("./routes/indexRouter");

function myMiddleware(req, res, next) {
  // Perform some operations
  console.log("Middleware function called");

  // Modify the request object
  req.customProperty = "Hello from myMiddleware";

  // Call the next middleware/route handler
  next();
}
app.use(myMiddleware);

app.use("/author", authorRouter);
app.use("/users", userRouter);
app.use("/", indexRouter);

app.use((req, res) => {
  // This works and this ends the request-response cycle
  res.send("Hello");

  // However, it does not exit the function so this will still run
  console.log("will still run!!");
});

app.get("/file/:name", (req, res, next) => {
  const options = {
    root: path.join(__dirname, "public"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  const fileName = req.params.name;
  console.log("filename: ", fileName);
  res.sendFile(fileName, options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

app.post("/messages", (req, res) =>
  res.send("This is where you can see any messages."),
);
app.get("/{messages}", (req, res) => {
  res.send(
    "This route will not be reached because the previous route's path matches first.",
  );
});
app.get("/:username/messages", (req, res) => {
  console.log(req.params);
  res.send("username is " + req.params.username);
  console.log("Params:", req.params);
  console.log("Query:", req.query);
  res.end();
});
app.get("/:username/messages/:messageId", (req, res) => {
  console.log(req.params);
  res.end();
});
app.get("/{*splat}", (req, res) => {
  res.send(
    "/{*splat} is a great way to catch all otherwise unmatched paths, e.g. for custom 404 error handling.",
  );
});

const PORT = 3000;
app.listen(PORT, (error) => {
  // This is important!
  // Without this, any startup errors will silently fail
  // instead of giving you a helpful error message.
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});
