module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define("Orders", {
        authorID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
    });

    return Orders;
};