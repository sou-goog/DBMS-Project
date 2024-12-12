module.exports = (sequelize, DataTypes) => {
    const Authors = sequelize.define("Authors", {
        authorID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        authorName: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        biography: {
            type: DataTypes.TEXT
        },
        nationality: {
            type: DataTypes.STRING(20)
        }

    });

    // Associate Method
    Authors.associate = (models) => {
        // Associations with Books
        Authors.hasMany(models.Books, {
            foreignKey: 'authorID'
        });
    };


    return Authors;
};
