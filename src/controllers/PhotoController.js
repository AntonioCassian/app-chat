import multer from 'multer';
import multerConfig from '../config/multerConfig';

import Photo from '../models/Photo';

const upload = multer(multerConfig).single('photo');

class PhotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error],
        });
      }
      try {
        const { originalname, filename } = req.file;
        const { user_id } = req.body;
        const photo = await Photo.create({ originalname, filename, user_id });
        res.json(photo);
      } catch (err) {
        return res.status(400).json({
          errors: ['User not exists'],
        });
      }
    });
  }
}

export default new PhotoController();
