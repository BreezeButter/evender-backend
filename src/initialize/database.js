const bcrypt = require("bcryptjs");

const password = "123456";
const hashedPassword = bcrypt.hashSync(password, 12);

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

sequelize
    .sync({ force: true })
    .then(() => {
        return UserType.bulkCreate([
            { id: 1, type: "Newbie" },
            { id: 2, type: "Explorer" },
            { id: 3, type: "UserGold" },
            { id: 4, type: "SupperUser" },
        ]);
    })

    .then(() => {
        return EventCategory.bulkCreate([
            { id: 1, name: "Bar" },
            { id: 2, name: "Sport" },
            { id: 3, name: "Resterant" },
            { id: 4, name: "Cafe" },
            { id: 5, name: "LifeStyle" },
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
                password: hashedPassword,
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
                password: hashedPassword,
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
                password: hashedPassword,
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
                password: hashedPassword,
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
                password: hashedPassword,
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
                placeProvince: "Bangkok",
                placeName: "Mintower",
                dateStart: "2038-01-19 03:14:07",
                dateEnd: "2038-01-20 03:14:07",
                capacity: 10,
                image1: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Olympics_2012_Mixed_Doubles_Final.jpg",
                userId: 1,
                eventCategoryId: 2,
                latitude: 13.668217,
                longitude: 100.614021,
                image1: "https://secure.meetupstatic.com/photos/event/1/e/1/600_454380481.jpeg",
                image2: "https://secure.meetupstatic.com/photos/event/5/4/a/600_451321354.jpeg",
            },
            {
                id: 2,
                title: "Ace The Place! Badminton Meetup",
                description:
                    "Looking for some friendly competition? Come and join our badminton meetup, Ace The Place!. It's a great way to improve your skills, meet fellow players and have a great time.",
                placeProvince: "Nakhonsawan",
                placeName: "NongSomBoon",
                dateStart: "2038-02-19 03:14:07",
                dateEnd: "2038-02-20 03:14:07",
                capacity: 15,
                image1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7tntHTg5E37aqURLh3s97v8DC1rqnJJE8ZQ&usqp=CAU",
                userId: 3,
                eventCategoryId: 2,
                latitude: 13.7470406,
                longitude: 100.5177129,
                image1: "https://secure.meetupstatic.com/photos/event/1/e/1/600_454380481.jpeg",
                image2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKqXSocS1-Q4-NfljEe0jxzElfzaZqfgjYdg&usqp=CAU",
            },
            {
                id: 3,
                title: "Snow Board",
                description:
                    "Join us for an action-packed day of Snow Board at our Snow Boardn Bonanza. Whether you're a seasoned player or just getting started, this is the perfect event to get involved, meet new people and have some fun.",
                placeProvince: "Bangkok",
                placeName: "Fahsion Island",
                dateStart: "2038-03-19 03:14:07",
                dateEnd: "2038-03-20 03:14:07",
                capacity: 20,
                image1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPN3udxXUYwnMG66K48oFMueXkVEU0V5_4Amgwkxzol0SMEulFSQut5XlzrUsDRyrrB-I&usqp=CAU",
                userId: 2,
                eventCategoryId: 2,
                latitude: 13.7343367,
                longitude: 100.5224472,
                image1: "https://www.rei.com/dam/content_team_082817_18850_snowboards_choose_lg.jpg",
                image2: "https://media.istockphoto.com/id/959512078/photo/girl-is-jumping-with-snowboard.jpg?s=612x612&w=0&k=20&c=Hv-UlzSeTBXUECnEAMPbnH3EUaSOrEbVzdCSPEnhXcQ=",
            },
            {
                id: 4,
                title: "Beer Cafe together all night",
                description:
                    "Get ready to make a racket at Beer Cafe! This is an event for all , meet new people, and have some fun.",
                placeProvince: "Nakhonpathom",
                placeName: "Club firBeer",
                dateStart: "2038-04-19 03:14:07",
                dateEnd: "2038-04-20 03:14:07",
                capacity: 25,
                image1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNHfeQmSpdd_9nMyBtDUvgm6LJYK5EOQK-gA&usqp=CAU",
                userId: 5,
                eventCategoryId: 1,
                latitude: 13.7403282,
                longitude: 100.5217915,
                image1: "https://www.forbesindia.com/media/images/2017/May/img_96157_rahulsingh_900x600.jpg",
                image2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5OcOV_9dEz4oW08eXVEQblLum0Hv5qZ_V7X2DO5e-ElSo7srzpDxSKywUrsQrQOO8AWc&usqp=CAU",
            },
        ]);
    })

    .then(() => {
        return EventReview.bulkCreate([
            { id: 1, rating: 3, userId: 1, eventId: 1 },
            { id: 2, rating: 4, userId: 2, eventId: 1 },
            { id: 3, rating: 3, userId: 3, eventId: 1 },
            { id: 4, rating: 4, userId: 4, eventId: 1 },
            { id: 5, rating: 3, userId: 5, eventId: 1 },
            { id: 6, rating: 4, userId: 1, eventId: 2 },
            { id: 7, rating: 3, userId: 2, eventId: 2 },
            { id: 8, rating: 2, userId: 3, eventId: 2 },
            { id: 9, rating: 3, userId: 4, eventId: 2 },
            { id: 10, rating: 4, userId: 5, eventId: 2 },
            { id: 11, rating: 1, userId: 1, eventId: 3 },
            { id: 12, rating: 4, userId: 2, eventId: 3 },
            { id: 13, rating: 3, userId: 3, eventId: 3 },
            { id: 14, rating: 2, userId: 4, eventId: 3 },
            { id: 15, rating: 3, userId: 5, eventId: 3 },
            { id: 16, rating: 4, userId: 1, eventId: 4 },
            { id: 17, rating: 3, userId: 2, eventId: 4 },
            { id: 18, rating: 4, userId: 3, eventId: 4 },
            { id: 19, rating: 3, userId: 4, eventId: 4 },
            { id: 20, rating: 4, userId: 5, eventId: 4 },
        ]);
    })

    .then(() => {
        return JoinEventUser.bulkCreate([
            { id: 1, userId: 1, eventId: 1 },
            { id: 2, userId: 2, eventId: 1 },
            { id: 3, userId: 3, eventId: 1 },
            { id: 4, userId: 4, eventId: 1 },
            { id: 5, userId: 5, eventId: 1 },
            { id: 6, userId: 2, eventId: 2 },
            { id: 7, userId: 3, eventId: 2 },
            { id: 8, userId: 4, eventId: 3 },
            { id: 9, userId: 5, eventId: 3 },
            { id: 10, userId: 1, eventId: 4 },
            { id: 11, userId: 3, eventId: 4 },
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