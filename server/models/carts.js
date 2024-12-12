module.exports = (sequelize, DataTypes) => {
    const Carts = sequelize.define("Carts", {
        cartID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'userID'
            }
        }
    });

    // Associate Methods
    Carts.associate = (models) => {
        // Association to Users - 1 user has 1 cart
        Carts.belongsTo(models.Users, {
            foreignKey: 'userID',
            onDelete: 'CASCADE'
        });

        // Association to CartItems - 1 Cart has many CartItems
        Carts.hasMany(models.CartItems, {
            foreignKey: 'cartID',
            onDelete: 'CASCADE'
        });
    };

    return Carts;
};
