import jwt from 'jsonwebtoken';
import User from '../models/User';
import Photo from '../models/Photo';

class TokenController {
  async store(req, res) {
    const { username = '', password = '' } = req.body;
    if (!username || !password) {
      return res.status(401).json({
        errors: ['Invalid Login!'],
      });
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({
        errors: ['User does not exist'],
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Invalid Password'],
      });
    }
    const { id } = user;
    const token = jwt.sign({ id, username }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.json({ token, user });
  }

  async index(req, res) {
    try {
      // const userId = await User.findByPk(req.params.id);
      const user = await User.findByPk(req.userId, {
        attributes: ['id', 'username', 'email'],
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
          attributes: ['url', 'filename'],
        },
      });

      if (!user) {
        return res.status(400).json({
          errors: ['not exist user!'],
        });
      }
      return res.json({ user });
    } catch (err) {
      console.log(err);
    }
  }
}

export default new TokenController();
