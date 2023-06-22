const {
    sequelize,
    Chat,
    Event,
    EventCategory,
    EventReview,
    JoinEventUser,
    QuickMessage,
    Transection,
    User,
    UserType,
} = require("../models");

sequelize.sync({ force: true }).then(() => {
    return UserType.bulkCreate([
        { id: 1, type: "Newbie" },
        { id: 2, type: "Explorer" },
        { id: 3, type: "UserGold" },
        { id: 4, type: "SupperUser" },
    ]);
})

    .then(() => {
        return EventCategory.bulkCreate([
            { id: 1, name: "Sport", emoji: "U+1F3C3" },
            { id: 2, name: "HangOut", emoji: "U+1F4E2" },
            { id: 3, name: "Learning", emoji: "U+1F4DD" },
            { id: 4, name: "Work", emoji: "U+1F4DA" },
        ]);
    })

    .then(() => {
        return User.bulkCreate([
            {
                id: 1,
                userName: "johndoe123",
                firstName: "John",
                lastName: "Doe",
                email: "johndoe123@example.com",
                password: 123456,
                gender: "Male",
                bdate: "1990-07-15",
                image: "https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg",
                coin: 1000,
                aboutMe:
                    "I'm John Doe. I love playing badminton and hiking in my spare time.",
                status: true,
                isAdmin: false,
                userTypeId: 3,
            },
            {
                id: 2,
                userName: "janedoe456",
                firstName: "Jane",
                lastName: "Doe",
                email: "janedoe456@example.com",
                password: 123456,
                gender: "Female",
                bdate: "1992-06-20",
                image: "https://img.freepik.com/premium-vector/young-smiling-african-man-avatar-3d-vector-people-character-illustration-cartoon-minimal-style_365941-883.jpg?w=2000",
                coin: 1200,
                aboutMe:
                    "Hi, I'm Jane Doe. I enjoy badminton and reading novels.",
                status: true,
                isAdmin: false,
                userTypeId: 1,
            },
            {
                id: 3,
                userName: "robertsmith789",
                firstName: "Robert",
                lastName: "Smith",
                email: "robertsmith789@example.com",
                password: 123456,
                gender: "Male",
                bdate: "1985-10-30",
                image: "https://img.freepik.com/vecteurs-premium/diversite-vectorielle-3d-conception-icone-avatar-jeune-homme_624031-151.jpg?w=2000",
                coin: 1500,
                aboutMe:
                    "Hello, I'm Robert Smith. In my free time, I like to play badminton and write poetry.",
                status: true,
                isAdmin: true,
                userTypeId: 2,
            },
            {
                id: 4,
                userName: "emilyjohnson1011",
                firstName: "Emily",
                lastName: "Johnson",
                email: "emilyjohnson1011@example.com",
                password: 123456,
                gender: "Female",
                bdate: "1993-04-12",
                image: "https://img.freepik.com/premium-vector/happy-young-woman-watching-into-rounded-frame-isolated-white-illustration-render-style_365941-118.jpg",
                coin: 800,
                aboutMe:
                    "I'm Emily Johnson. I'm a badminton enthusiast and love to travel.",
                status: true,
                isAdmin: false,
                userTypeId: 1,
            },
            {
                id: 5,
                userName: "michaeltaylor1213",
                firstName: "Michael",
                lastName: "Taylor",
                email: "michaeltaylor1213@example.com",
                password: 123456,
                gender: "Male",
                bdate: "1989-01-25",
                image: "https://media.istockphoto.com/id/1389823037/vector/young-smiling-woman-mia-avatar-3d-vector-people-character-illustration-cartoon-minimal-style.jpg?s=612x612&w=0&k=20&c=ciwsDqBIy3mcTxhWN4I1S-kKSTvjoN1einMrQawNZDQ=",
                coin: 900,
                aboutMe:
                    "Hi, I'm Michael Taylor. I love playing badminton and watching movies.",
                status: true,
                isAdmin: false,
                userTypeId: 1,
            },
        ]);
    })

    .then(() => {
        return Event.bulkCreate([
            {
                id: 1,
                title: "Smash It Up! Community Badminton Event",
                description:
                    "Are you ready for a fun, engaging, and healthful event? Join us for our Community Badminton Event, titled Smash It Up!. This is a perfect opportunity to show off your badminton skills, meet new people, and get a great workout.",
                location: "Bangkok",
                dateStart: '2038-01-19 03:14:07',
                dateEnd: '2038-01-19 03:14:07',
                capacity: 10,
                image1: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Olympics_2012_Mixed_Doubles_Final.jpg",
                userId: 1,
                eventCategoryId: 1,
                latitude: 13.668217,
                longitude: 100.614021,
            }
        ]);
    })

    .then(() => {
        return EventReview.bulkCreate([
            { id: 1, rating: "3", userId: 1, eventId: 1 },
            { id: 2, name: "4", userId: 2, eventId: 1 },
        ]);
    })

    .then(() => {
        return JoinEventUser.bulkCreate([
            { id: 1, userId: 1, eventId: 1 },
            { id: 2, userId: 2, eventId: 1 },
            { id: 3, userId: 3, eventId: 1 },
            { id: 4, userId: 4, eventId: 1 },
            { id: 5, userId: 5, eventId: 1 },
        ]);
    })

    .then(() => {
        return QuickMessage.bulkCreate([
            { id: 1, message: "OK !! I will go together" },
            { id: 2, message: "I am interested" },
            { id: 3, message: "How much for go event" },
        ]);
    })

    .then(() => {
        return Chat.bulkCreate([
            {
                id: 1,
                message: "Hello, is anyone up for badminton this weekend?",
                userId: 1,
                eventId: 1,
            },
            {
                id: 2,
                message: "Hey, I'm interested. Where are we planning to play?",
                userId: 2,
                eventId: 1,
            },
            {
                id: 3,
                message: "Great! How about the local sports center?",
                userId: 1,
                eventId: 1,
            },
            {
                id: 4,
                message:
                    "https://images.squarespace-cdn.com/content/v1/5bd969d6506fbe4b1a0f5e6b/1613556027347-TNYY9VEX2PRTODIHEP9J/shutterstock_1592944909+-+Badminton+racket+and+shuttlecock+in+motion_1200px+JPEG.jpg?format=1000w",
                userId: 2,
                eventId: 1,
            },
            {
                id: 5,
                message: "How about 10 am on Saturday?",
                userId: 3,
                eventId: 1,
            },
            {
                id: 6,
                message: "Sounds good. I'll bring an extra racket.",
                userId: 4,
                eventId: 1,
            },
            {
                id: 7,
                message: "Perfect. See you all then.",
                userId: 1,
                eventId: 1,
            },
            {
                id: 8,
                image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Olympics_2012_Mixed_Doubles_Final.jpg",
                userId: 5,
                eventId: 1,
            },
            {
                id: 9,
                message: "No worries, we'll catch you next time!",
                userId: 3,
                eventId: 1,
            },
            {
                id: 10,
                message:
                    "Looking forward to it. Let's try to make this a regular thing!",
                userId: 4,
                eventId: 1,
            },
        ]);
    })

    .then(() => process.exit(0))
    .catch((err) => console.log(err.message));
