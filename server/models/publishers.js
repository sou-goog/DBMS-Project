module.exports = (sequelize, DataTypes) => {
    const Publishers = sequelize.define("Publishers", {
        publisherID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            validate: {
                min: 1 // Ensures publisherID > 0
            }
        },
        publisherName: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT
        }
    }, {
        timestamps: false
    });


    Publishers.associate = (models) => {
        Publishers.hasMany(models.Books, {
            foreignKey: 'publisherID'
        });
    };

    return Publishers;
};
