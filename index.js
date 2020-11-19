#!/usr/bin/env node

const fs = require("fs");
const encryptor = require("simple-encryptor");

// simple-encryptor requires password with this min length
const MIN_PASSWORD_LENGTH = 16;

let [,, input,, password] = process.argv;
let data = fs.readFileSync(input, "utf8");

if (password.length < MIN_PASSWORD_LENGTH) {
  password += Array(MIN_PASSWORD_LENGTH - password.length).fill("0");
}

const {encrypt, decrypt} = encryptor(password);

if (input.endsWith(".enc")) {
  fs.writeFileSync(input.replace(".enc", ""), decrypt(data));
} else {
  fs.writeFileSync(`${input}.enc`, encrypt(data));
}
