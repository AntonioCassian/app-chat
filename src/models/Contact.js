/* eslint-disable import/no-extraneous-dependencies */
import { Model, DataTypes } from 'sequelize';

export default class Contact extends Model {
  static init(sequelize) {
    super.init(
      {
        userCid: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        userEmail: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        userUsername: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'contacts',
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userCid', as: 'user' });
  }
}
