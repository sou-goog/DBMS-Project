module.exports = (sequelize, DataTypes) => {
    const OrderDetails = sequelize.define("OrderDetails", {
        orderDetailID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        orderID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Orders", // Table name being referenced
                key: "orderID"
            },
            onDelete: "CASCADE"
        },
        bookID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Books", // Table name being referenced
                key: "bookID"
            },
            // onDelete: "SET NULL"
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1 // Quantity must be greater than 0
            }
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0 // Amount must be non-negative
            }
        }
    });

    OrderDetails.associate = (models) => {
        OrderDetails.belongsTo(models.Orders, {
            foreignKey: 'orderID',
            // onDelete: 'CASCADE'
        });

        OrderDetails.belongsTo(models.Books, {
            foreignKey: 'bookID',
            // onDelete: 'CASCADE'
        });
    };

    // Hook to calculate `amount` before saving an order detail
    OrderDetails.addHook("beforeSave", async (orderDetail, options) => {
        const Book = sequelize.models.Books;

        // Fetch the book to get its price
        const book = await Book.findByPk(orderDetail.bookID);
        if (!book) {
            throw new Error("Book not found for the given bookID.");
        }

        // Calculate amount based on quantity and book price
        orderDetail.amount = orderDetail.quantity * book.bookPrice;
    });

    return OrderDetails;
};
