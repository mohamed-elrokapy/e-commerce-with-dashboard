// Strapi 5 backend: products through the REST API, accounts through the
// users-permissions plugin (JWT). Passwords are hashed by Strapi, never by
// this app and never shown in the UI.
//
// What Strapi needs (see my-strapi/README.md):
//   Public role         product: find, findOne
//   Authenticated role  user: me, update (own profile)
//   Role "admin"        product: create, update, delete
//                       user: find, findOne, update, destroy
//                       users-permissions role: find
//
// "Admin" here means a users-permissions role whose type or name is "admin".
// It is separate from the Strapi admin panel accounts.

import { ApiError, normalizeProduct, normalizeUser } from "./shared";

const TOKEN_KEY = "shopdemo.strapi.jwt";

const getToken = () =>
  sessionStorage.getItem(TOKEN_KEY) ?? localStorage.getItem(TOKEN_KEY);

function storeToken(token, remember) {
  sessionStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_KEY);
  (remember ? localStorage : sessionStorage).setItem(TOKEN_KEY, token);
}

function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

const isAdminRole = (role) =>
  [role?.type, role?.name].some((v) => String(v ?? "").toLowerCase() === "admin");

function toUser(raw) {
  return normalizeUser({
    id: raw.id,
    fullName: raw.username,
    email: raw.email,
    phone: raw.phone,
    role: isAdminRole(raw.role) ? "admin" : "user",
    createdAt: raw.createdAt,
  });
}

function toProduct(raw) {
  return normalizeProduct({
    id: raw.documentId ?? raw.id,
    title: raw.title,
    productDescription: raw.productDescription,
    price: raw.price,
    img: raw.img,
    createdAt: raw.createdAt,
  });
}

const productBody = (v) => ({
  data: {
    title: v.title,
    productDescription: v.description,
    price: Number(v.price),
    img: v.image,
  },
});

export function createStrapiBackend(baseUrl) {
  async function request(path, { method = "GET", body, auth = false, token } = {}) {
    const headers = {};
    if (body !== undefined) headers["Content-Type"] = "application/json";
    const jwt = token ?? (auth ? getToken() : null);
    if (jwt) headers.Authorization = `Bearer ${jwt}`;

    let response;
    try {
      response = await fetch(`${baseUrl}${path}`, {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
      });
    } catch (cause) {
      throw new ApiError(`Could not reach the API at ${baseUrl}. Is Strapi running?`, { cause });
    }

    if (response.status === 204) return null;
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      /* empty or non-JSON body */
    }
    if (!response.ok) {
      const message =
        response.status === 403
          ? "Strapi denied this request. Check the role permissions."
          : response.status === 401
            ? "Your session has expired. Please sign in again."
            : (payload?.error?.message ?? `Request failed (${response.status}).`);
      throw new ApiError(message, { status: response.status });
    }
    return payload;
  }

  let rolesCache = null;
  async function roleIdFor(name) {
    if (!rolesCache) {
      const payload = await request("/users-permissions/roles", { auth: true });
      rolesCache = payload.roles ?? [];
    }
    const role =
      name === "admin"
        ? rolesCache.find(isAdminRole)
        : (rolesCache.find((r) => r.type === "user") ??
          rolesCache.find((r) => r.type === "authenticated"));
    if (!role) throw new ApiError(`No "${name}" role exists in Strapi.`);
    return role.id;
  }

  return {
    id: "strapi",
    label: "Strapi",
    description: `Connected to ${baseUrl}.`,
    capabilities: { google: false, seedCatalog: false, resetDemo: false },

    async listProducts() {
      const payload = await request("/products?pagination[pageSize]=100&sort=createdAt:asc");
      return (payload.data ?? []).map(toProduct);
    },

    async createProduct(values) {
      const payload = await request("/products", { method: "POST", body: productBody(values), auth: true });
      return toProduct(payload.data);
    },

    async updateProduct(id, values) {
      const payload = await request(`/products/${id}`, { method: "PUT", body: productBody(values), auth: true });
      return toProduct(payload.data);
    },

    async deleteProduct(id) {
      await request(`/products/${id}`, { method: "DELETE", auth: true });
    },

    async listUsers() {
      const users = await request("/users?populate=role&pagination[pageSize]=100", { auth: true });
      return (Array.isArray(users) ? users : []).map(toUser);
    },

    async updateUser(id, patch) {
      const body = {};
      if (patch.fullName !== undefined) body.username = patch.fullName;
      if (patch.phone !== undefined) body.phone = patch.phone;
      if (patch.role !== undefined) body.role = await roleIdFor(patch.role);
      await request(`/users/${id}`, { method: "PUT", body, auth: true });
      const fresh = await request(`/users/${id}?populate=role`, { auth: true });
      return toUser(fresh);
    },

    async deleteUser(id) {
      await request(`/users/${id}`, { method: "DELETE", auth: true });
    },

    async register({ fullName, email, phone, password }) {
      const result = await request("/auth/local/register", {
        method: "POST",
        body: { username: fullName.trim(), email: email.trim(), password },
      });
      // The register endpoint only accepts username, email and password, so the
      // phone number is saved in a second call with the new account's token.
      if (phone?.trim()) {
        await request(`/users/${result.user.id}`, {
          method: "PUT",
          body: { phone: phone.trim() },
          token: result.jwt,
        }).catch(() => {
          /* non-fatal: the account exists, the phone can be added later */
        });
      }
      return normalizeUser({ id: result.user.id, fullName: fullName.trim(), email, phone });
    },

    async login({ email, password, remember }) {
      const result = await request("/auth/local", {
        method: "POST",
        body: { identifier: email.trim(), password },
      }).catch((error) => {
        if (error.status === 400) throw new ApiError("Invalid email or password.", { status: 401 });
        throw error;
      });
      storeToken(result.jwt, remember);
      return toUser(await request("/users/me?populate=role", { token: result.jwt }));
    },

    async restoreSession() {
      if (!getToken()) return null;
      try {
        return toUser(await request("/users/me?populate=role", { auth: true }));
      } catch (error) {
        if (error.status === 401 || error.status === 403) {
          clearToken();
          return null;
        }
        throw error;
      }
    },

    async logout() {
      clearToken();
      rolesCache = null;
    },
  };
}
