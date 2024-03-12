import express from 'express';
import { uploadImage, handleFile, getImageList } from '../controllers/imageController';

const router = express.Router();

// Define your routes



router.get('/', getImageList);
router.get('/upload', (req, res) => {
  res.render('uploadForm', { error: null });
});


router.post('/upload', uploadImage, handleFile);

export default router;
