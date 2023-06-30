// const { Event, User } = require("../models");
const stripe = require("stripe")(
    "sk_test_51NM49zIQqnWPmtA0GztvWndWPnW58Y8LGkwn4APwhL8RhSC0XwrtCkPLUJF1tf6ROHjvJ1ORoQNn0UbsP9Xq0aj100Xzai2BB0"
);

const YOUR_DOMAIN = "http://localhost:5173";

exports.payment = async (req, res) => {
    const user = req.user;
    const data = req.query;
    console.log(data);
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
    // const id = req.user.id;
    // const event = req.event.id;
    const payload = req.body;
    console.log(payload);
    const paymentBoostpost = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: payload.productDefaultPrice,
                quantity: 1,
            },
        ],
        mode: "payment",
        payment_method_types: ["card"],
        success_url: `${YOUR_DOMAIN}/evender/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${YOUR_DOMAIN}/evender/event`,
        metadata: {
            event_id: payload.eventId,
            productDefaultPrice: payload.productDefaultPrice,
            userId: payload.userId,
        },
        // metadata: {
        //     name: "เขียว",
        // },
    });
    console.log(paymentBoostpost);
    res.json({ message: "success", session: paymentBoostpost });
};
