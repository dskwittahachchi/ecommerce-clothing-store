import { ApiError } from "../utils/apiError.js";

export function notFoundMiddleware(req, _res, next) {
  next(new ApiError(404, `Route ${req.method} ${req.originalUrl} was not found.`));
}

export function errorHandler(error, _req, res, _next) {
  const status = error.status || 500;
  const message = status === 500 ? "Something went wrong on our side." : error.message;
  if (status === 500 && process.env.NODE_ENV !== "test") console.error(error);
  res.status(status).json({ success: false, message, errors: error.errors || [] });
}
