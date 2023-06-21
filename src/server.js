const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
});

// io.on("connection", (socket) => {
//     console.log("A user connected.");

//     socket.on("disconnect", () => {
//         console.log("A user disconnected.");
//     });

//     socket.on("message", (message) => {
//         io.emit("message", message);
//     });
// });

const chatRooms = {}; // Store the chat rooms

io.on("connection", (socket) => {
    console.log("New client connected");

    // Handle joining a chat room
    socket.on("join room", (room) => {
        socket.join(room); // Join the specified room
        chatRooms[room] = chatRooms[room] || []; // Create the room if it doesn't exist
        socket.emit("room messages", chatRooms[room]); // Send existing messages to the joining user
    });

    // Handle chat messages
    socket.on("chat message", ({ room, message }) => {
        console.log("Message received:", message);
        chatRooms[room].push(message); // Store the message in the room's message array
        io.to(room).emit("chat message", message); // Broadcast the message to all clients in the room
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

httpServer.listen(3000, () => console.log("server running on port " + 3000));
