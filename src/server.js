import express from "express";
import { create } from "venom-bot";
import { stages, getStage } from "./stages.js";

const app = express();
let client;

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send('<center style="margin: 100px 0;font-family: "Cairo";">تطبيق المتجر<br> الإصدار : 1.0.0</center>');
});

app.get("/login", (req, res) => {
    create(
      "main",
      (base64Qrimg, asciiQR, attempts, urlCode) => {
        if (base64Qrimg) {
          res.send('<center style="margin: 100px 0;"><img src="' + base64Qrimg + '"/></center>')
        }
      },
      (statusSession, session) => {
        if (statusSession == 'isLoggedn') {
          res.send('Connected');
        }
        console.log("Status Session: ", statusSession);
      },
      {
        folderNameToken: "tokens",
        mkdirFolderToken: "",
        headless: true,
      }
    )
    .then((cl) => {
      client = cl; // Assign the client to the global variable
      start(client);
  
      if (req.query.out) {
        client.close();
      }
      res.send('<center style="margin: 100px 0;"><img width="100" height="100" src="https://img.icons8.com/dotty/1000/40C057/ok.png" alt="Done"/></center>')
    })
    .catch((error) => {
      console.error('Error creating client:', error);
      res.status(500).send('Error creating client');
    });
  
    async function start(client) {
      await client.onMessage(async (message) => {
        try {
          const currentStage = getStage({ from: message.from });
  
          const messageResponse = stages[currentStage].stage.exec({
            from: message.from,
            message: message.body,
            client,
          });
  
          if (messageResponse) {
            await client.sendText(message.from, messageResponse);
          }
        } catch (error) {
          client.close();
        }
      });
  
      process.on("SIGINT", function () {
        client.close();
        server.close(); // Close the Express server when the Venom client is closed
      });
    }

});

app.get("/logout", (req, res) => {
  client.close().then(() => {
    res.send('<center style="margin: 100px 0;"><img width="100" height="100" src="https://img.icons8.com/dotty/1000/40C057/ok.png" alt="Done"/></center>');
  });
});

app.get("/sendMessage", (req, res) => {
  const phone = req.query.phone;
  const message = req.query.message;
  
  client.sendText(
    phone + '@c.us',message
  ).then(() => res.send('1'))
});

app.get("/sendImage", async (req, res) => {
  const phone = req.query.phone;
  const message = req.query.message;
  const image = req.query.image;
  
  await client.sendImage(phone + '@c.us', image, 'Image caption', message).then(() => res.send('1'))
});

const server = app.listen(3000, () => {
  console.log("App Start Successfully:3000");
});
