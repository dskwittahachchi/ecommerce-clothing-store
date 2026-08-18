import { ApiError } from "../utils/apiError.js";

export function validate(schema, source = "body") {
  return (req, _res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message
      }));
      return next(new ApiError(400, "Please check the highlighted information.", errors));
    }
    req[source] = result.data;
    return next();
  };
}
