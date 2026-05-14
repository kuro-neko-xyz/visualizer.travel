const { Client } = require("pg");
const fs = require("fs");
require("dotenv").config();

const client = new Client({
  user: "visualizer",
  host: "localhost",
  database: "visualizer",
  password: process.env.PG_PASSWORD,
  port: 5432,
});

client.connect();