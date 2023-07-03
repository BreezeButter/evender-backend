const stripe = require("stripe")(
    "sk_test_51NM49zIQqnWPmtA0GztvWndWPnW58Y8LGkwn4APwhL8RhSC0XwrtCkPLUJF1tf6ROHjvJ1ORoQNn0UbsP9Xq0aj100Xzai2BB0"
);
const createError = require("../utils/createError");
const { Event } = require("../models");

const YOUR_DOMAIN = "http://localhost:5173";

exports.payment = async (req, res) => {
    const user = req.user;
    const data = req.query;
    const response = {};
    const session = await stripe.checkout.sessions.retrieve(
        req.query.session_id
    );
    //   console.log("________1", session);

    console.log(session.metadata.event_id);
    console.log(session.metadata.productDefaultPrice);
    console.log(session.payment_status);
    console.log(session.status);

    if (session.payment_status !== "paid" || session.status !== "complete") {
        createError("payment", 400);
    }
    const event = await Event.update(
        { isBoost: 1 },
        {
            where: {
                id: +session.metadata.event_id,
                productDefaultPrice: session.metadata.productDefaultPrice,
            },
        }
    );

    if (session) {
        response.session = session;
    }
    return res.json({
        message: "success",
        ...response,
    });
};

exports.createPayment = async (req, res) => {
    const payload = req.body;

    const paymentBoostpost = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: payload.productDefaultPrice,
                quantity: 1,
            },
        ],
        mode: "payment",
        payment_method_types: ["card"],
        success_url: `${req.headers.origin}/evender/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/evender/event`,
        metadata: {
            event_id: payload.eventId,
            productDefaultPrice: payload.productDefaultPrice,
            userId: payload.userId,
        },
    });
    res.json({ message: "success", session: paymentBoostpost });
};

// exports.upBoostPost = async (req, res, next) => {
//     try {
//         console.log(req.params);
//         console.log(req.body);
// const session = req.boby.session;
// console.log(session.metadata.event_id);
// console.log(session.metadata.productDefaultPrice);
// console.log(session.payment_status);
// console.log(session.status);

// const boostPost = {
//     paymentStatus: session.payment_status,
//     statusSuccess: session.status,
//     eventId: session.metadata.event_id,
//     productDefaultPrice: session.metadata.productDefaultPrice,
// };
// const id = req.user;
// console.log(id);
// const value = req.body;
// const user = await Event.update(
//     { isBoost: 1 },
//     {
//         where: {
//             [Op.and]: [
//                 { eventId: +value.id },
//                 { productDefaultPrice: id },
//             ],
//         },
//     }
// );

//         res.status(200).json(user);
//     } catch (err) {
//         next(err);
//     }
// };

// exports.createPaymentSuccess = async (req, res, next) => {
//     try {
//         const value = req.body;
//         const user = await User.create(value);
//         const accessToken = tokenService.sign({ id: user.id });
//         res.status(200).json({ accessToken });
//     } catch (err) {
//         next(err);
//     }
// };
