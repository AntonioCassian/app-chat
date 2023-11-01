/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        username: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 40],
              msg: 'User must have between 3 and 40 characters',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'Email already exists',
          },
          validate: {
            isEmail: {
              msg: 'invalid email',
            },
            isUnique(value, next) {
              User.findOne({ where: { email: value } })
                .then((user) => {
                  if (user) {
                    return next('email already exists, try another');
                  }
                  return next();
                })
                .catch((err) => next(err));
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: '',
          validate: {
            len: {
              args: [6, 8],
              msg: 'The password must be between 6 and 8 characters long',
            },
          },
        },
      },
      { sequelize },
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }

  static associations(models) {
    this.hasMany(models.Photo, models.Chat, { foreignKey: ['user_id', 'user_idm'] });
  }
}
