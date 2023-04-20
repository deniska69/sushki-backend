require("dotenv").config();

const PORT = process.env.PORT || 5000;
const NAME_PROJECT = process.env.NAME_PROJECT || 'Unnamed';
const REACT_CLIENT_URL = process.env.REACT_CLIENT_URL || 'http://localhost:3000';

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: REACT_CLIENT_URL,
        methods: ["GET", "POST"],
    },
});

const start = async () => {
    try {
        io.on("connection", (socket) => {
            console.log('\nUser connected:', socket?.id);
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
    } catch (err) {
        console.error(err);
    };
};

start();