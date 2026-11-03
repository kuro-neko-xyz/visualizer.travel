# visualizer.travel

Keep every trip in one place: your flights, where you're staying, and a timeline that puts it all together across time zones.

visualizer.travel is a mobile app built with React Native (Expo) and TypeScript, backed by a Fastify and PostgreSQL API. It's headed for the App Store and Google Play, with [visualizer.travel](https://visualizer.travel) as its future landing page.

## Features

- **Trips:** create and edit trips
- **Flights:** add each flight, picking airports with search by IATA or ICAO code, city or name
- **Accommodations:** add where you're staying on each trip
- **Itinerary:** a timeline of a trip's flights and stays, shown in the time zone you choose
- **Works offline:** trips are saved on the device, so they're there without a connection

## How it works

- **Airport search.** The API serves a PostgreSQL airports table. Searches match code, city or name, rank exact IATA and ICAO matches first, and return the top 10.
- **Time zones.** Every flight keeps the time zone of its origin and destination, so departure and arrival times stay correct on the itinerary.
- **Local-first storage.** Trips live on the device in MMKV, a fast key-value store.
- **Passwordless accounts (in progress).** The app generates a key pair on the device, keeps the private key in the system keychain, and registers only the public key with the API.

## Tech stack

| Part | Built with |
| --- | --- |
| Mobile app (`app/`) | React Native 0.81, Expo SDK 54, Expo Router, TypeScript, React Compiler, MMKV |
| API (`api/`) | Node.js, Fastify, PostgreSQL, TypeScript |

## Project structure

```
visualizer.travel/
├── app/   # Expo mobile app (screens, components, helpers, models)
└── api/   # Fastify API and airport-database seed script
```

## Getting started

You'll need Node.js, PostgreSQL, and an iOS simulator, Android emulator or a phone.

### 1. API

Create the database from a `psql` shell:

```sql
CREATE ROLE visualizer WITH LOGIN PASSWORD '<your password>';
CREATE DATABASE visualizer;
ALTER DATABASE visualizer OWNER TO visualizer;
```

On a fresh PostgreSQL install you may need to change the authentication method in `pg_hba.conf` from `peer` to `scram-sha-256`, so you can log in as `visualizer` without creating a matching system user.

Then configure, seed and start the API:

```bash
cd api
cp .env.example .env        # set PG_PASSWORD and the other PG_* values
npm install
npm run populate            # loads the airports table
npm run dev
```

### 2. Mobile app

```bash
cd app
cp .env.example .env        # point EXPO_PUBLIC_API_URL at your API, e.g. http://<your-computer-ip>:3000/
npm install
npm run ios                 # or: npm run android
```

The app uses native modules (MMKV, keychain, crypto), so it runs as an Expo development build rather than in Expo Go.

## Roadmap

- [ ] Finish passwordless accounts and sync
- [ ] Release on the App Store and Google Play
- [ ] Landing page at visualizer.travel

## License

[GPL-3.0](LICENSE.md)
