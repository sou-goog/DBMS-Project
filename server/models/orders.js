module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define("Orders", {
        orderID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users", // Assuming a Users table exists
                key: "userID"
            },
            onDelete: "CASCADE"
        },
        totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.0
        }
    });

    Orders.associate = (models) => {
        Orders.belongsTo(models.Users, {
            foreignKey: 'userID',
            onDelete: 'CASCADE'
        });

        Orders.hasMany(models.OrderDetails, {
            foreignKey: 'orderID',
            onDelete: 'CASCADE'
        });
    };

    // Hook to calculate totalAmount before updating or creating an order
    Orders.addHook("beforeSave", async (order, options) => {
        const OrderDetails = sequelize.models.OrderDetails;

        const orderDetails = await OrderDetails.findAll({
            where: { orderID: order.orderID }
        });

        // Sum up the `amount` field of all associated OrderDetails
        order.totalAmount = orderDetails.reduce((total, detail) => total + parseFloat(detail.amount), 0);
    });

    return Orders;
};
