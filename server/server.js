const Fastify = require("fastify");
const { user } = require("pg/lib/defaults");
require("dotenv").config();

const fastify = Fastify({
  logger: true,
});

fastify.register(require("@fastify/postgres"), {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

fastify.get("/airports", async (request, reply) => {
  const { search } = request.query;

  if (!search) {
    return [];
  }

  const exactSearch = search.trim();

  const client = await fastify.pg.connect();

  const { rows } = await client.query(
    `SELECT * FROM airports
    
    WHERE name ILIKE $1
      OR city ILIKE $1
      OR icao ILIKE $1
      OR iata ILIKE $1

    ORDER BY
      CASE WHEN iata ILIKE $2 THEN 0 ELSE 1 END,
      CASE WHEN icao ILIKE $2 THEN 0 ELSE 1 END,
      CASE WHEN city ILIKE $2 THEN 0 ELSE 1 END,
      CASE WHEN name ILIKE $2 THEN 0 ELSE 1 END,
      CASE WHEN iata IS NULL OR TRIM(iata) = '' THEN 1 ELSE 0 END,
      name ASC
      
    LIMIT 10`,
    [`%${search}%`, exactSearch],
  );

  client.release();

  return rows;
});

const start = async () => {
  try {
    await fastify.listen({ host: "0.0.0.0", port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

module.exports = fastify;
