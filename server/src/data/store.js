import bcrypt from "bcryptjs";

export const store = {
  users: [
    {
      id: "usr-shopper",
      name: "Maya Laurent",
      email: "shopper@elan.demo",
      passwordHash: bcrypt.hashSync("ShopElan2026!", 10),
      role: "customer",
      addresses: []
    },
    {
      id: "usr-admin",
      name: "Alex Morgan",
      email: "admin@elan.demo",
      passwordHash: bcrypt.hashSync("AdminElan2026!", 10),
      role: "admin",
      addresses: []
    }
  ],
  carts: new Map(),
  wishlists: new Map(),
  orders: [
    {
      id: "EL-10428",
      userId: "usr-shopper",
      createdAt: "2026-08-12T09:15:00.000Z",
      items: [
        { productId: "prd-linen-overshirt", name: "Linen Atelier Overshirt", variant: "M / Oat", quantity: 1, unitPrice: 148 }
      ],
      totals: { subtotal: 148, shipping: 12, tax: 11.84, total: 171.84 },
      shippingAddress: { name: "Maya Laurent", city: "Colombo", country: "Sri Lanka" },
      paymentStatus: "paid",
      orderStatus: "shipped",
      timeline: [
        { label: "Order confirmed", date: "Aug 12", complete: true },
        { label: "In the atelier", date: "Aug 13", complete: true },
        { label: "Shipped", date: "Aug 14", complete: true },
        { label: "Delivered", date: "Expected Aug 19", complete: false }
      ]
    },
    {
      id: "EL-10391",
      userId: "usr-shopper",
      createdAt: "2026-07-28T14:40:00.000Z",
      items: [
        { productId: "prd-ribbed-knit", name: "Contour Rib Knit", variant: "S / Chalk", quantity: 1, unitPrice: 84 },
        { productId: "prd-sculpt-trouser", name: "Sculpted Wide Trouser", variant: "28 / Espresso", quantity: 1, unitPrice: 126 }
      ],
      totals: { subtotal: 210, shipping: 0, tax: 16.8, total: 226.8 },
      shippingAddress: { name: "Maya Laurent", city: "Colombo", country: "Sri Lanka" },
      paymentStatus: "paid",
      orderStatus: "delivered",
      timeline: [
        { label: "Order confirmed", date: "Jul 28", complete: true },
        { label: "In the atelier", date: "Jul 29", complete: true },
        { label: "Shipped", date: "Jul 30", complete: true },
        { label: "Delivered", date: "Aug 03", complete: true }
      ]
    }
  ],
  reviews: [
    { id: "rev-1", userId: "usr-shopper", productId: "prd-linen-overshirt", rating: 5, comment: "Beautiful weight and the fit feels considered.", createdAt: "2026-08-05T08:00:00.000Z" }
  ]
};

export function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}
