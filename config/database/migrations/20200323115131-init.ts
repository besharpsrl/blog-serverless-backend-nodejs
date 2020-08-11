module.exports = {

  up: async (queryInterface, Sequelize) => {
    // book table
    await queryInterface.createTable('book', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true
      },
      title: Sequelize.DataTypes.TEXT
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("book");
  }
};
