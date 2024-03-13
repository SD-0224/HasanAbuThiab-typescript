import express from "express";
import {
  uploadImage,
  handleFile,
  getImageList,
  resizeImage,
  renderResizeForm,
  renderCropForm,
  cropImage,
  renderWaterMarkForm,
  waterMarkImage,
  applyGreyScale,
} from "../controllers/imageController";

const router = express.Router();

router.get("/", getImageList);
router.get("/upload", (req, res) => {
  res.render("uploadForm", { error: null });
});
router.get("/crop/:imageName", renderCropForm);
router.put("/crop/:imageName", cropImage);

router.get("/resize/:imageName", renderResizeForm);
router.put("/resize/:imageName", resizeImage);

router.get("/watermark/:imageName", renderWaterMarkForm)
router.post("/watermark/:imageName",uploadImage, waterMarkImage)

router.put("/grey/:imageName", applyGreyScale)
router.post("/upload", uploadImage, handleFile);

export default router;
