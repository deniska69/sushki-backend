require("dotenv").config();
const express = require('express');
const PORT = process.env.PORT;
const NAME_PROJECT = process.env.NAME_PROJECT;
const app = express();

const start = async () => {
    try {
      app.listen(PORT, () => {
        console.log(`\nBack-Сервер '${NAME_PROJECT}' запущен [`, new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }), "(МСК)]. Порт:", PORT);
  
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
        console.log(e);
    }
};
  
start();