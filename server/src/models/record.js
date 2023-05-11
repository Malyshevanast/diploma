const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Service, User }) {
      // define association here
      this.belongsTo(Service, { foreignKey: 'service_id', as: 'service' });
      this.belongsTo(User, { foreignKey: 'user_id', as: 'client' });
    }
  }
  Record.init(
    {
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      service_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'service',
          key: 'id',
        },
      },
      date: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      question: {
        type: DataTypes.STRING,
      },
      is_confirmed: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      modelName: 'Record',
      tableName: 'record',
    }
  );
  return Record;
};
