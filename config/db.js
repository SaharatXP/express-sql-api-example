const mysql = require("mysql2/promise");

const createConnection = async () => {
  const connection = await mysql.createConnection({
    host: "203.146.252.149",
    port: "3306",
    user: "devshr_node",
    password: "Saharat100542",
    database: "devshr_node",
  });

  return connection;
};

module.exports = createConnection;
