const User = require("../models/user");
const { matchedData, validationResult } = require("express-validator");

const links = [
  { href: "/", text: "Home" },
  { href: "/new", text: "New Message" },
  { href: "/users", text: "Users" },
  { href: "/users/new", text: "Create User" },
  { href: "/search", text: "Search Users" },
];

const users = [
  new User({
    id: 1,
    name: "Amando",
    email: "amando@example.com",
    age: 28,
    bio: "Likes shipping little Express apps.",
  }),
  new User({
    id: 2,
    name: "Charles",
    email: "charles@example.com",
    age: 34,
    bio: "Writes messages and keeps things tidy.",
  }),
  new User({
    id: 3,
    name: "Rosa",
    email: "rosa@example.com",
    bio: "Enjoys helping users find what they need quickly.",
  }),
];

let nextUserId = users.length + 1;

function getUserFormValues(body) {
  return {
    name: String(body.name ?? "").trim(),
    email: String(body.email ?? "").trim().toLowerCase(),
    age: String(body.age ?? "").trim(),
    bio: String(body.bio ?? "").trim(),
  };
}

function renderUserList(req, res) {
  res.render("users/index", {
    title: "Users",
    links,
    users,
  });
}

function renderCreateUser(req, res) {
  res.render("users/createUser", {
    title: "Create User",
    links,
    errors: [],
    values: {
      name: "",
      email: "",
      age: "",
      bio: "",
    },
  });
}

function createUser(req, res) {
  const values = getUserFormValues(req.body);
  const errors = validationResult(req)
    .array({ onlyFirstError: true })
    .map((error) => error.msg);

  if (errors.length > 0) {
    res.status(400).render("users/createUser", {
      title: "Create User",
      links,
      errors,
      values,
    });
    return;
  }

  const userData = matchedData(req, {
    locations: ["body"],
    includeOptionals: true,
  });

  users.push(
    new User({
      id: nextUserId,
      name: userData.name,
      email: userData.email,
      age: userData.age ?? null,
      bio: userData.bio ?? "",
    }),
  );
  nextUserId += 1;

  res.redirect("/users");
}

function searchUsers(req, res) {
  const nameQuery = String(req.query.name ?? "").trim().toLowerCase();
  const emailQuery = String(req.query.email ?? "").trim().toLowerCase();
  const hasSubmitted = nameQuery.length > 0 || emailQuery.length > 0;

  const matches = hasSubmitted
    ? users.filter((user) => {
        const matchesName = nameQuery
          ? user.name.toLowerCase().includes(nameQuery)
          : true;
        const matchesEmail = emailQuery
          ? user.email.toLowerCase().includes(emailQuery)
          : true;

        return matchesName && matchesEmail;
      })
    : [];

  res.render("users/search", {
    title: "Search Users",
    links,
    users: matches,
    query: {
      name: req.query.name ?? "",
      email: req.query.email ?? "",
    },
    hasSubmitted,
  });
}

module.exports = {
  renderUserList,
  renderCreateUser,
  createUser,
  searchUsers,
};
