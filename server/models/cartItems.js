module.exports = (sequelize, DataTypes) => {
    const CartItems = sequelize.define("CartItems", {
        authorID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
    });

    return CartItems;
};