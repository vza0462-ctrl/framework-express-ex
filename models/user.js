class User {
  constructor({ id, name, email, age = null, bio = "" }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.age = age;
    this.bio = bio;
  }
}

module.exports = User;
