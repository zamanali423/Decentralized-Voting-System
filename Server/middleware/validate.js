const { z } = require("zod");

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
    });
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.errors[0]?.message || "Validation error";
      return res.status(405).json({ msg: message });
    }
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

module.exports = validate;
