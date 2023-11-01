import Sequelize, { Model } from 'sequelize';

export default class Chat extends Model {
  static init(sequelize) {
    super.init(
      {
        chat: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
      },
      {
        sequelize,
        tableName: 'messages',
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_idm' });
  }
}
