/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('record', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('record');
  },
};
