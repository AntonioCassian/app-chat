import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Chat from '../models/Chat';

const message = multer(multerConfig).single('chat');

class ChateController {
  store(req, res) {
    return message(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error],
        });
      }
      try {
        const { chat, user_idm } = req.body;
        const chatMessage = await Chat.create({ chat, user_idm });
        return res.json(chatMessage);
      } catch (e) {
        return res.status(400).json({
          errors: 'User not exists',
        });
      }
    });
  }

  async show(req, res) {
    try {
      const msgUser = await Chat.findByPk(req.params.id);
      // const { user_idm } = req.body;
      return res.json({ msgUser });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new ChateController();
