import { Router } from "express";
import { categories, products } from "../data/products.js";
import { store } from "../data/store.js";
import { ApiError } from "../utils/apiError.js";

export const productRoutes = Router();

productRoutes.get("/", (req, res) => {
  const search = String(req.query.search || "").trim().toLowerCase();
  const category = String(req.query.category || "All");
  const sort = String(req.query.sort || "featured");
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(24, Math.max(1, Number(req.query.limit) || 12));

  let result = products.filter((product) => {
    const matchesSearch = !search || `${product.name} ${product.description} ${product.collection}`.toLowerCase().includes(search);
    const matchesCategory = category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  result = [...result].sort((a, b) => {
    if (sort === "price-asc") return a.basePrice - b.basePrice;
    if (sort === "price-desc") return b.basePrice - a.basePrice;
    if (sort === "rating") return b.rating - a.rating;
    return (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0);
  });

  const total = result.length;
  const data = result.slice((page - 1) * limit, page * limit);
  res.json({ success: true, message: "Catalog loaded.", data, meta: { page, limit, total, pages: Math.ceil(total / limit), categories } });
});

productRoutes.get("/:slug", (req, res) => {
  const product = products.find((candidate) => candidate.slug === req.params.slug);
  if (!product) throw new ApiError(404, "This piece could not be found.");
  const reviews = store.reviews.filter((review) => review.productId === product.id);
  res.json({ success: true, message: "Product loaded.", data: { ...product, reviews } });
});
