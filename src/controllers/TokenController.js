import jwt from 'jsonwebtoken';
import User from '../models/User';

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
}

export default new TokenController();
