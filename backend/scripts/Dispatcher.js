import { createInterface } from "node:readline/promises";
import { Writable } from "node:stream";
import bcrypt from "bcryptjs";
import pool from "../config/db.js";

let hideInput = false;

const output = new Writable({
  write(chunk, encoding, callback) {
    if (!hideInput) {
      process.stdout.write(chunk, encoding);
    }

    callback();
  },
});

const terminal = createInterface({
  input: process.stdin,
  output,
  terminal: true,
});

const createDispatcher = async () => {
  try {
    const fullName = (
      await terminal.question("Full name: ")
    ).trim();

    const username = (
      await terminal.question("Username: ")
    ).trim().toLowerCase();

    process.stdout.write("Password (input hidden): ");
    hideInput = true;

    let password;

    try {
      password = await terminal.question("");
    } finally {
      hideInput = false;
      process.stdout.write("\n");
    }

    if (!fullName || !username || !password) {
      throw new Error("All fields are required.");
    }

    if (fullName.length > 150 || username.length > 100) {
      throw new Error("Name or username is too long.");
    }

    if (
      password.length < 8 ||
      password.length > 64 ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      throw new Error(
        "Password must be 8 to 64 characters and no more than 72 UTF-8 bytes."
      );
    }

    const [existing] = await pool.execute(
      "SELECT id FROM dispatchers WHERE username = ? LIMIT 1",
      [username]
    );

    if (existing.length) {
      throw new Error("Dispatcher username already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.execute(
      `
        INSERT INTO dispatchers (
          full_name,
          username,
          password
        )
        VALUES (?, ?, ?)
      `,
      [fullName, username, hashedPassword]
    );

    console.log("Dispatcher account created successfully.");
  } catch (error) {
    console.error(
      "Account creation failed:",
      error.code === "ER_DUP_ENTRY"
        ? "Dispatcher username already exists."
        : error.message
    );

    process.exitCode = 1;
  } finally {
    terminal.close();
    await pool.end();
  }
};

await createDispatcher();