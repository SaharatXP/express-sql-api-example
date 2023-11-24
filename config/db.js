const mysql = require("mysql2/promise");

const createConnection = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "root",
    password: "root",
    database: "tutorial_auth",
  });

  return connection;
};

module.exports = createConnection;
