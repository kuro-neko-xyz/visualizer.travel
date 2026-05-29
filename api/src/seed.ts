import { Client } from "pg";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
});

async function seedDatabase() {
  await client.connect();

  try {
    await client.query("BEGIN");

    await client.query(`
      CREATE TABLE IF NOT EXISTS airports (
        icao CHAR(4) PRIMARY KEY,
        iata CHAR(3),
        name VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        state VARCHAR(255),
        country VARCHAR(255) NOT NULL,
        elevation SMALLINT NOT NULL,
        lat DOUBLE PRECISION NOT NULL,
        lon DOUBLE PRECISION NOT NULL,
        tz VARCHAR(255)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        public_key TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Reading file...");

    const rawData = fs.readFileSync("airports.json");
    const airports = JSON.parse(rawData.toString("utf-8"));

    console.log(`Found ${airports.length} records. Inserting...`);

    const insertQuery = `
      INSERT INTO airports (icao, iata, name, city, state, country, elevation, lat, lon, tz)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (icao) DO NOTHING;
    `;

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
    console.error("Error seeding data:", error);
  } finally {
    await client.end();
  }
}

seedDatabase();

module.exports = client;
