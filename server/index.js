// api/index.js

import app from "./app";

export default function handler(req, res) {
  return app(req, res);
}
