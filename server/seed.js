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

async function seedDatabase() {
  await client.connect();

  await client.query(`
    CREATE TABLE IF NOT EXISTS airports (
      icao CHAR(4) PRIMARY KEY,
      iata CHAR(3),
      name VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      state VARCHAR(255),
      country VARCHAR(255) NOT NULL,
      elevation SMALLINT,
      lat DOUBLE PRECISION NOT NULL,
      lon DOUBLE PRECISION NOT NULL,
      tz VARCHAR(255)
    );
  `);

  console.log("Reading file...");

  const rawData = fs.readFileSync("airports.json");
  const airports = JSON.parse(rawData);

  console.log(`Found ${airports.length} records. Inserting...`);

  const insertQuery = `
    INSERT INTO airports (icao, iata, name, city, state, country, elevation, lat, lon, tz)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `;

  await client.query("BEGIN");

  try {
    for (const key of Object.keys(airports)) {
      const airport = airports[key];

      await client.query(insertQuery, [
        airport.icao,
        airport.iata,
        airport.name,
        airport.city,
        airport.state,
        airport.country,
        airport.elevation,
        airport.lat,
        airport.lon,
        airport.tz,
      ]);
    }

    await client.query("COMMIT");

    console.log("Database seeded successfully.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error inserting data:", error);
  } finally {
    await client.end();
  }
}

seedDatabase();
