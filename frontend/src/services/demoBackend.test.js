import { beforeEach, describe, expect, it } from "vitest";

// Minimal in-memory Web Storage so the demo backend can run under Node.
function memoryStorage() {
  let data = {};
  return {
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => {
      data[k] = String(v);
    },
    removeItem: (k) => {
      delete data[k];
    },
    clear: () => {
      data = {};
    },
  };
}

let backend;

beforeEach(async () => {
  globalThis.localStorage = memoryStorage();
  globalThis.sessionStorage = memoryStorage();
  const { createDemoBackend } = await import("./demoBackend");
  backend = createDemoBackend();
});

describe("demo backend", () => {
  it("seeds products and users without exposing passwords", async () => {
    const products = await backend.listProducts();
    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toMatchObject({ title: expect.any(String), price: expect.any(Number) });
    const users = await backend.listUsers();
    expect(users.length).toBeGreaterThan(0);
    for (const u of users) {
      expect(u).not.toHaveProperty("password");
      expect(u).not.toHaveProperty("credentials");
    }
  });

  it("stores only a salted hash, never the password", async () => {
    await backend.register({
      fullName: "Test Person",
      email: "test@example.test",
      phone: "555 0123",
      password: "Sup3rSecret!",
    });
    const raw = localStorage.getItem("shopdemo.demo.data.v1");
    expect(raw).not.toContain("Sup3rSecret!");
    expect(raw).toContain("salt");
  });

  it("logs in with the right password and rejects the wrong one", async () => {
    await backend.register({
      fullName: "Test Person",
      email: "test@example.test",
      phone: "555 0123",
      password: "Sup3rSecret!",
    });
    await expect(
      backend.login({ email: "test@example.test", password: "nope" })
    ).rejects.toThrow(/invalid email or password/i);
    const user = await backend.login({ email: "TEST@example.test", password: "Sup3rSecret!" });
    expect(user.role).toBe("user");
    expect((await backend.restoreSession()).id).toBe(user.id);
    await backend.logout();
    expect(await backend.restoreSession()).toBeNull();
  });

  it("rejects duplicate emails", async () => {
    const account = { fullName: "A B C", email: "dup@example.test", phone: "555 0123", password: "Passw0rd!" };
    await backend.register(account);
    await expect(backend.register(account)).rejects.toThrow(/already exists/);
  });

  it("creates, updates and deletes products", async () => {
    const created = await backend.createProduct({ title: "New", description: "d", price: "3", image: "" });
    expect(created.price).toBe(3);
    await backend.updateProduct(created.id, { title: "Renamed", description: "d", price: "4", image: "" });
    expect((await backend.listProducts()).find((p) => p.id === created.id).title).toBe("Renamed");
    await backend.deleteProduct(created.id);
    expect((await backend.listProducts()).some((p) => p.id === created.id)).toBe(false);
  });
});
