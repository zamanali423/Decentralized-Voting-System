require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const socketIO = require("socket.io");
const Web3 = require("web3");

const port = process.env.PORT;
const app = express();
const userRouter = require("./router/userRouter/userRouter");
const pollsRouter = require("./router/pollsRouter/pollsRouter");
const Polls = require("./database/polls/pollsData");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/auth/users", userRouter);
app.use("/polls", pollsRouter);

// WebSocket logic
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("createPoll", async (data) => {
    try {
      const poll = new Polls(data);
      await poll.save();
      io.emit("savePoll", poll);
      await logPollOnBlockchain(data); // Log poll creation on the blockchain
    } catch (error) {
      console.error("Error creating poll:", error);
      // Handle error by sending appropriate response to client
    }
  });

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

mongoose
  .connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected successfully");
    server.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

// Web3 Initialization
const providerUrl = process.env.WEB3_PROVIDER_URL || 'http://localhost:7545';
// const web3 = new Web3(providerUrl);

// Example function to log poll creation on the blockchain (Implement your logic here)
const logPollOnBlockchain = async (pollData) => {
  // Use web3 to interact with your smart contract and store poll data
  console.log("Logging poll on blockchain:", pollData); // Placeholder
};

// Similar functions for vote logging and verification (Implement your logic here)
const logVoteOnBlockchain = async (voteData) => {
  console.log("Logging vote on blockchain:", voteData); // Placeholder
};

const verifyPollOnBlockchain = async (pollId) => {
  console.log("Verifying poll on blockchain:", pollId); // Placeholder
};
