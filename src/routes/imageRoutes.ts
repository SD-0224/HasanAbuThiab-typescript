import express from "express";
import {
  uploadImage,
  handleFile,
  getImageList,
  resizeImage,
  renderResizeForm,
} from "../controllers/imageController";

const router = express.Router();

router.get("/", getImageList);
router.get("/upload", (req, res) => {
  res.render("uploadForm", { error: null });
});
router.get("/resize/:imageName", renderResizeForm);

router.put("/resize/:imageName", resizeImage);

router.post("/upload", uploadImage, handleFile);

export default router;
