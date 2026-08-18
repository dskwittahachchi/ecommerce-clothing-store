import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { store } from "../data/store.js";
import { ApiError } from "../utils/apiError.js";

export function authMiddleware(req, _res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return next(new ApiError(401, "Sign in is required to continue."));

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const user = store.users.find((candidate) => candidate.id === payload.sub);
    if (!user) return next(new ApiError(401, "Your session is no longer valid."));
    req.user = user;
    return next();
  } catch {
    return next(new ApiError(401, "Your session is invalid or has expired."));
  }
}

export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ApiError(403, "You do not have permission to access this resource."));
    }
    return next();
  };
}
