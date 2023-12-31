import Contact from '../models/Contact';
import User from '../models/User';

class ContactController {
  async store(req, res) {
    try {
      const { userEmail, userUsername } = req.body;

      const user = await User.findByPk(req.userCid);

      if (!user) {
        return res.status(400).json({
          errors: ['User does not exist'],
        });
      }

      const isContactAdd = await Contact.findOne({
        where: {
          userCid: user.id,
          userEmail: user.email,
        },
      });

      if (isContactAdd) {
        return res.status(400).json({
          errors: ['User already added'],
        });
      }

      const contact = await User.findOne({
        where: {
          email: userEmail,
        },
      });

      if (!contact) {
        return res.status(404).json({
          errors: ['Contact not found'],
        });
      }

      await Contact.create({
        userCid: user.id,
        userEmail: user.email,
        userUsername,
      });
      return res.json({ message: 'Friend added successfully' });
    } catch (e) {
      console.log(e);
    }
  }

  async index(req, res) {
    try {
      const user = await User.findAll();
      res.json({ user });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        errors: ['Internal server error'],
      });
    }
  }
}

export default new ContactController();

/**
 *

  try {
      const { username, email } = req.body;

      if (!username || !email) {
        return res.status(400).json({
          error: ['Both username and email are required.'],

        });
      }

      const user = await User.findByPk(req.email);

      if (!user) {
        return res.status(400).json({
          errors: ['User does not exist'],
        });
      }

      const isContactAdd = await Contact.findOne({
        where: {
          userCid: user.id,
          userEmail: email,
        },
      });

      if (isContactAdd) {
        return res.status(400).json({
          errors: ['User already added'],
        });
      }

      const contact = await User.findOne({
        where: {
          email,
        },
      });

      if (!contact) {
        return res.status(404).json({
          errors: ['Contact not found'],
        });
      }

      await Contact.create({
        userCid: user.id,
        userEmail: email,
        userUsername: username,
      });
      return res.json({ message: 'Friend added successfully' });
    } catch (e) {
      return res.status(400).json({
        errors: ['Internal server error'],
      });
    }
 */
