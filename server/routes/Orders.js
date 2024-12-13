const express = require('express');
const router = express.Router();
const {Orders, OrderDetails, Carts, CartItems, Books} = require('../models');
const { Op } = require('sequelize');



// TODO - Show all orders for users
router.get('/showOrders', async (req, res) => {
    const userID = req.user.userID;
    
    // 1. get all orders
    const orders = await Orders.findAll({
        where: {
            userID: userID
        }
    })

    // 2. get all details for each order
    const ordersWithOrderDetails = await Promise.all(orders.map(async (order) => {
        const orderDetails = await OrderDetails.findAll({
            where: {
                orderID: order.orderID
            },
            include: [{model: Books}]
        })

        return {
            ...order.toJSON(),
            orderDetails: orderDetails
        };

    }));
    
    res.json({
        message: 'Orders retrieved successfully.',
        orders: ordersWithOrderDetails
    })

})

// TODO - Order Cart i.e. cartItems under cart -> orderDetails under order
router.post('/ordercart', async (req, res) => {
    const userID = req.user.userID;

    try {
        // 1. Get users cartID
        const cart = await Carts.findOne({
            where: {
                userID: userID
            }
        })
        usersCartID = cart.cartID;

        // 2. Get All the cartItems in users cart
        const cartItems = await CartItems.findAll({
            where: {
                cartID: usersCartID
            }
        })

        // 3. Create A Order
        newOrder = await Orders.create({
            userID: userID,
            orderStatus: 'INCOMPLETE'            
        })

        // 4. Add order details to the order
        const orderDetails = await Promise.all(cartItems.map(async (cartItem) => {
            return await OrderDetails.create({
                orderID: newOrder.orderID,
                bookID: cartItem.bookID,
                quantity: cartItem.quantity,
                amount: cartItem.price,

            });
        }));

        await CartItems.destroy({
          where: {
                cartID: usersCartID
            }
        })
        res.json({
            message: "Order Created.",
            newOrder,
            orderDetails
        })
    } catch(error) {
        console.error('Error creating order:', error)
        res.status(201).json({
            message: "Error creating order.",
            error: error.message
        })
    }
})


// TODO - Cancel order if ('INCOMPLETE')



// TODO - Delete orderDetails(items) i.e. quantity 0



// TODO - Modify orderDetails i.e. quantity change kro















module.exports = router;