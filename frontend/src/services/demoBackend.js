// Browser-only backend. All data lives in localStorage so the whole app can be
// explored without any server or account. Passwords are salted and hashed
// (see lib/passwords.js) and are never kept in the user objects the UI sees.

import { hashPassword, verifyPassword } from "../lib/passwords";
import { DEMO_ACCOUNTS, DEMO_PRODUCTS } from "./demoSeed";
import { ApiError, normalizeProduct, normalizeUser } from "./shared";

const DATA_KEY = "shopdemo.demo.data.v1";
const SESSION_KEY = "shopdemo.demo.session";

const uid = (prefix) =>
  `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

const wait = (ms = 120) => new Promise((r) => setTimeout(r, ms));

function read() {
  try {
    const raw = localStorage.getItem(DATA_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function write(data) {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

async function seed() {
  const users = [];
  for (const account of DEMO_ACCOUNTS) {
    const { password, ...profile } = account;
    users.push({
      ...profile,
      id: uid("u"),
      createdAt: new Date().toISOString(),
      credentials: await hashPassword(password),
    });
  }
  const data = { products: DEMO_PRODUCTS, users };
  write(data);
  return data;
}

async function load() {
  return read() ?? (await seed());
}

const publicUser = ({ credentials: _credentials, ...user }) => normalizeUser(user);

function getStoredSessionId() {
  return (
    sessionStorage.getItem(SESSION_KEY) ?? localStorage.getItem(SESSION_KEY)
  );
}

export function createDemoBackend() {
  return {
    id: "demo",
    label: "Demo mode",
    description:
      "Data is stored in this browser only. Nothing is sent to a server.",
    capabilities: { google: false, seedCatalog: false, resetDemo: true },

    async listProducts() {
      await wait();
      return (await load()).products.map(normalizeProduct);
    },

    async createProduct(values) {
      await wait();
      const data = await load();
      const product = {
        id: uid("p"),
        title: values.title,
        productDescription: values.description,
        price: Number(values.price),
        img: values.image,
        createdAt: new Date().toISOString(),
      };
      data.products.push(product);
      write(data);
      return normalizeProduct(product);
    },

    async updateProduct(id, values) {
      await wait();
      const data = await load();
      const index = data.products.findIndex((p) => p.id === id);
      if (index === -1) throw new ApiError("Product not found", { status: 404 });
      data.products[index] = {
        ...data.products[index],
        title: values.title,
        productDescription: values.description,
        price: Number(values.price),
        img: values.image,
      };
      write(data);
      return normalizeProduct(data.products[index]);
    },

    async deleteProduct(id) {
      await wait();
      const data = await load();
      data.products = data.products.filter((p) => p.id !== id);
      write(data);
    },

    async listUsers() {
      await wait();
      return (await load()).users.map(publicUser);
    },

    async updateUser(id, patch) {
      await wait();
      const data = await load();
      const user = data.users.find((u) => u.id === id);
      if (!user) throw new ApiError("User not found", { status: 404 });
      for (const key of ["fullName", "phone", "role"]) {
        if (patch[key] !== undefined) user[key] = patch[key];
      }
      write(data);
      return publicUser(user);
    },

    async deleteUser(id) {
      await wait();
      const data = await load();
      data.users = data.users.filter((u) => u.id !== id);
      write(data);
    },

    async register({ fullName, email, phone, password }) {
      const data = await load();
      const taken = data.users.some(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );
      if (taken) throw new ApiError("An account with this email already exists.");
      const user = {
        id: uid("u"),
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        role: "user",
        createdAt: new Date().toISOString(),
        credentials: await hashPassword(password),
      };
      data.users.push(user);
      write(data);
      return publicUser(user);
    },

    async login({ email, password, remember }) {
      const data = await load();
      const user = data.users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );
      const ok = user && (await verifyPassword(password, user.credentials));
      if (!ok) throw new ApiError("Invalid email or password.", { status: 401 });
      sessionStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(SESSION_KEY);
      (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, user.id);
      return publicUser(user);
    },

    async restoreSession() {
      const id = getStoredSessionId();
      if (!id) return null;
      const user = (await load()).users.find((u) => u.id === id);
      return user ? publicUser(user) : null;
    },

    async logout() {
      sessionStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(SESSION_KEY);
    },

    async resetDemo() {
      localStorage.removeItem(DATA_KEY);
      await seed();
    },
  };
}
