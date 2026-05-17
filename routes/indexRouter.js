const { Router } = require("express");

const indexRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

const links = [
  { href: "/", text: "Home" },
  { href: "/new", text: "New Message" },
];

indexRouter.get("/", (req, res) => {
  res.render("index", {
    title: "Mini Messageboard",
    links,
    messages,
  });
});

indexRouter.get("/new", (req, res) => {
  res.render("form", {
    title: "New Message",
    links,
  });
});

indexRouter.post("/new", (req, res) => {
  const { messageUser, messageText } = req.body;

  messages.push({
    text: messageText,
    user: messageUser,
    added: new Date(),
  });

  res.redirect("/");
});

indexRouter.get("/messages/:messageId", (req, res) => {
  const messageId = Number.parseInt(req.params.messageId, 10);
  const message = messages[messageId];

  if (!message) {
    res.status(404).send("Message not found");
    return;
  }

  res.render("message", {
    title: "Message Details",
    links,
    message,
    messageId,
  });
});

module.exports = indexRouter;
