module.exports = (sequelize, DataTypes) => {

    const Books = sequelize.define("Books", {
        bookID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        bookTitle: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        bookGenre: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: "default",
        },
        bookPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0, // Check bookPrice >= 0
            },
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0, // Check stock >= 0
            },
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0.0,
        },
        authorID: {
            type: DataTypes.INTEGER,
            references: {
                model: "Authors", // Name of the table
                key: "authorID", // Column name in the Authors table
            },
        },
        publisherID: {
            type: DataTypes.INTEGER,
            references: {
                model: "Publishers", // Name of the table
                key: "publisherID", // Column name in the Publishers table
            },
        }
    });

    // Add this associate method
    Books.associate = (models) => {
        // Associations with Authors and Publishers
        Books.belongsTo(models.Authors, {
            foreignKey: 'authorID',

        });

        Books.belongsTo(models.Publishers, {
            foreignKey: 'publisherID',
        });
    };

    return Books;
};
