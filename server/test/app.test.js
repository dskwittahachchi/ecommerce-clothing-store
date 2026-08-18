import assert from "node:assert/strict";
import test from "node:test";
import request from "supertest";
import { app } from "../src/app.js";

test("health endpoint reports seeded demo mode", async () => {
  const response = await request(app).get("/api/health").expect(200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.data.mode, "seeded-demo");
});

test("catalog supports category filtering and search", async () => {
  const response = await request(app).get("/api/products?category=Outerwear&search=linen").expect(200);
  assert.equal(response.body.data.length, 1);
  assert.equal(response.body.data[0].slug, "linen-atelier-overshirt");
});

test("protected routes reject anonymous requests", async () => {
  const response = await request(app).get("/api/orders/my").expect(401);
  assert.equal(response.body.success, false);
});

test("customer can sign in and create a stock-validated order", async () => {
  const login = await request(app)
    .post("/api/auth/login")
    .send({ email: "shopper@elan.demo", password: "ShopElan2026!" })
    .expect(200);

  const response = await request(app)
    .post("/api/orders")
    .set("Authorization", `Bearer ${login.body.data.token}`)
    .send({
      items: [{ productId: "prd-ribbed-knit", variantId: "var-rk-s-chalk", quantity: 1 }],
      shippingAddress: {
        name: "Maya Laurent",
        email: "maya@example.com",
        line1: "12 Galle Face Court",
        line2: "",
        city: "Colombo",
        region: "Western",
        postalCode: "00300",
        country: "Sri Lanka"
      }
    })
    .expect(201);

  assert.equal(response.body.data.items[0].name, "Contour Rib Knit");
  assert.equal(response.body.data.paymentStatus, "paid");
});

test("customer cannot access the admin dashboard", async () => {
  const login = await request(app)
    .post("/api/auth/login")
    .send({ email: "shopper@elan.demo", password: "ShopElan2026!" });
  await request(app).get("/api/admin/dashboard").set("Authorization", `Bearer ${login.body.data.token}`).expect(403);
});
