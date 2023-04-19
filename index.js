require("dotenv").config();

const PORT = process.env.PORT || 5000;
const NAME_PROJECT = process.env.NAME_PROJECT;

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const cors = require('cors');

app.use(cors({ origin: "*" }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
})

const start = async () => {
  try {
    //TODO move to socket module
    io.on("connection", (socket) => {
      console.log('\nsocket connect:', socket?.id);

      io.on("disconnect", () => {
        console.error("\nsocket disconnect");
      });
    });

    server.listen(PORT, () => {
      console.log(`\nBackend-Server '${NAME_PROJECT}' started [`, new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }), "(MSK) ]. Port:", PORT);

      var twirlTimer = (function () {
          var P = ["\\", "|", "/", "-"];
          var x = 0;
          return setInterval(function () {
              process.stdout.write("\r" + P[x++]);
              x &= 3;
          }, 250);
      })();
    });
  } catch (e) {
      console.error(e);
  }
};
  
start();