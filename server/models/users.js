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
        userType: {
            type: DataTypes.STRING(5), // 'admin' or 'euser'
            allowNull: false,
            defaultValue: 'euser',
            validate: {
                isIn: [['admin', 'euser']]
            }
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
    }, {
        hooks: {
            afterCreate: async (user, options) => {
                const {Carts} = sequelize.models;
                
                await Carts.create({
                    userID: user.userID
                }, options)
            }
        }
    })

    hooks: {

    }

    Users.associate = (models) => {
        Users.hasOne(models.Carts, {
            foreignKey: 'userID',
            onDelelte: 'CASCADE'
        });

        Users.hasMany(models.Orders, {
            foreignKey: 'userID',
            // onDelelte: ''
        })
    }

    return Users;
};
