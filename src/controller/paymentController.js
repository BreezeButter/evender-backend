const stripe = require("stripe")(
    "sk_test_51NM49zIQqnWPmtA0GztvWndWPnW58Y8LGkwn4APwhL8RhSC0XwrtCkPLUJF1tf6ROHjvJ1ORoQNn0UbsP9Xq0aj100Xzai2BB0"
);

const YOUR_DOMAIN = "http://localhost:5173";

exports.payment = async (req, res) => {
    const user = req.user;
    const data = req.query;
    const response = {};
    //   console.log("payment :", data);
    const session = await stripe.checkout.sessions.retrieve(
        req.query.session_id
    );
    //   console.log("________1", session);
    if (session) {
        response.session = session;
    }
    //   await Payment.create({
    //     id: session.id,
    //     userId: user.id,
    //   });
    //   console.log("_______aa", req.query);

    return res.json({
        message: "success",
        ...response,
    });
};

exports.createPayment = async (req, res) => {
    const payload = req.body;
    console.log(payload);
    const paymentCoin = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: payload.productId,
                quantity: 1,
            },
        ],
        mode: "payment",
        payment_method_types: ["card"],
        success_url: `${YOUR_DOMAIN}/evender/success-payment?session_id=%7BCHECKOUT_SESSION_ID%7D`,
        cancel_url: `${YOUR_DOMAIN}/evender/event`,
    });
};
