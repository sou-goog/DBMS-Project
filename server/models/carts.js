module.exports = (sequelize, DataTypes) => {
    const Carts = sequelize.define("Carts", {
        authorID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
    });

    return Carts;
};