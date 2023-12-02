import User from '../models/User';
import Photo from '../models/Photo';

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { id, username, email } = newUser;
      return res.json({ id, username, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'username', 'email'],
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
          attributes: ['filename'],
        },
      });
      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      const { id, username, email } = user;
      return res.json({ id, username, email });
    } catch (e) {
      return res.json(null);
    }
  }
}

export default new UserController();
