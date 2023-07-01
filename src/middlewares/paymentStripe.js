const { Event, JoinEventUser, User } = require("../models");
const stripe = require("stripe")(
    "sk_test_51NM49zIQqnWPmtA0GztvWndWPnW58Y8LGkwn4APwhL8RhSC0XwrtCkPLUJF1tf6ROHjvJ1ORoQNn0UbsP9Xq0aj100Xzai2BB0"
);

module.exports = async (req, res, next) => {
    try {
        const product = await stripe.products.create({
            name: req.body.title,
            default_price_data: {
                currency: "USD",
                unit_amount_decimal: "249.00",
            },
        });
        console.log("######product.default_price######", product.default_price);
        console.log("#####product#####", product);

        const paymentLink = await stripe.paymentLinks.create({
            line_items: [
                {
                    price: product.default_price,
                    quantity: 1,
                    //paymentLinkUrl:paymentLink.url
                },
            ],
        });

        const customer = await stripe.customers.create(`${product.id}`, {
            metadata: {
                order_id: product.default_price,
            },

            //paymentLinkUrl:paymentLink.url
        });
        console.log("######customer########", customer);

        req.body = {
            ...req.body,
            paymentLinkUrl: paymentLink.url,
            productDefaultPrice: product.default_price,
        };

        next();
    } catch (err) {
        next(err);
    }
};
