module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        userID: {   // Primary Key
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {    // Unique
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: true,
            unique: true
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        firstName: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    });

    return Users;
};
