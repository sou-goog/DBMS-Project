module.exports = (sequelize, DataTypes) => {
    const Reviews = sequelize.define("Reviews", {
        authorID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
    });

    return Reviews;
};