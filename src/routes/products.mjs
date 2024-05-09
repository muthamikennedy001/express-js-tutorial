import { Router } from "express";
import { mockProducts } from "../utils/constants.mjs";

const router = Router();
router.get("/api/products", (req, res) => {
  if (req.signedCookies.messi && req.signedCookies.messi === "goat")
    return res.send(mockProducts);
  return res.status(403).send({ msg: "sorry, you need a valid cookie" });
});
export default router;
