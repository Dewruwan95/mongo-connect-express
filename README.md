# 🚀 mongo-connect-express

[![npm version](https://img.shields.io/badge/npm-v1.0.0-blue.svg)](https://www.npmjs.com/package/mongo-connect-express)
[![npm downloads](https://img.shields.io/npm/dm/mongo-connect-express.svg)](https://www.npmjs.com/package/mongo-connect-express)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.5+-3178C6.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A lightweight package for easily connecting Express applications to MongoDB using Mongoose.

## ✨ Features

- 🔌 **Simple Connection** - One-function approach to connect to MongoDB
- 🔐 **Environment Variables** - Uses `.env` for secure connection string storage
- 📘 **TypeScript Support** - Full type definitions included
- 🧩 **Minimal Setup** - Get connected with just a few lines of code
- 🗄️ **Database Selection** - Optionally specify which database to use

## 📦 Installation

```bash
# Using npm
npm install mongo-connect-express

# Using yarn
yarn add mongo-connect-express

# Using pnpm
pnpm add mongo-connect-express
```

## 🚦 Quick Start

### Step 1: Set up your environment variables

Create a `.env` file in your project root:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
```

### Step 2: Connect to MongoDB in your Express app

```typescript
import express from "express";
import connectMongo from "mongo-connect-express";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // ✅ Connect to MongoDB
    await connectMongo();

    // 🚀 Start your Express server
    app.listen(PORT, () => {
      console.log(`🌐 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
```

## 💡 Usage Examples

### Specifying Database Name

```typescript
await connectMongo({ dbName: "my_database" });
```

### Overriding Connection String

```typescript
await connectMongo({
  uri: "mongodb://localhost:27017/my_local_db",
  dbName: "custom_db_name", // Optional
});
```

## 📚 API Reference

### `connectMongo(options?)`

Connects to MongoDB using Mongoose.

#### Parameters

| Parameter        | Type   | Description               | Required                                   |
| ---------------- | ------ | ------------------------- | ------------------------------------------ |
| `options`        | Object | Connection options        | No                                         |
| `options.uri`    | String | MongoDB connection string | No (defaults to `process.env.MONGODB_URI`) |
| `options.dbName` | String | Database name to use      | No                                         |

#### Returns

- `Promise<typeof mongoose>` - Promise that resolves to a Mongoose instance

## ⚠️ Error Handling

The function will throw an error if:

- No MongoDB URI is provided (either in .env or as a parameter)
- Connection to MongoDB fails

```typescript
try {
  await connectMongo();
  // Connection successful
} catch (error) {
  console.error("MongoDB connection failed:", error);
  // Handle error appropriately
}
```

## 📋 Complete Example

Here's a more complete example including model definition and API routes:

```typescript
// db/connection.ts
import { connectMongo } from "mongo-connect-express";
import dotenv from "dotenv";

dotenv.config();

export default connectMongo;

// models/User.ts
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", userSchema);

// server.ts
import express from "express";
import connectMongo from "./db/connection";
import { User } from "./models/User";

const app = express();
app.use(express.json());

// Create a new user
app.post("/users", async (req, res) => {
  try {
    await connectMongo();
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    await connectMongo();
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
```

## 📝 License

MIT © Your Name

---

<p align="center">Made with ❤️ for MongoDB and Express developers</p>
