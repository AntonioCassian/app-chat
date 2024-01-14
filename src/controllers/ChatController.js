import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Chat from '../models/Message';
import User from '../models/User';

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
        const user = await User.findByPk(user_idm);
        if (!user) {
          return res.status(400).json({
            errors: 'User does not exist',
          });
        }
        const chatMessage = await Chat.create({ chat, user_idm });

        // io.to(user_idm).emit('newMessage', chatMessage);

        return res.json(chatMessage);
      } catch (e) {
        return res.status(400).json({
          errors: 'Failed to sennd message',
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
