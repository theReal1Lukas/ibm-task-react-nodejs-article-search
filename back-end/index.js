const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

let allArticles = "";

app.post("/", (req, res) => {
  const api = "2b3317379cf46e137d7045280dbc2b62";
  const keyword = req.body.article;
  const url = `https://gnews.io/api/v4/search?q=${keyword}&max=9&token=${api}`;

  let options = { json: true };
  request(url, options, (error, res, body) => {
    allArticles = body.articles;
    if (error) {
      console.log(error);
    } else {
      //place to do something with json object (body)
    }
  });

  console.log(`Search keywords: ${keyword}`);
});



//digits from 0 to 8 is each card index number//
const cardId = ":var(0|1|2|3|4|5|6|7|8)?";
app.get(`/${cardId}`, (req, res) => {
  //req.url is url that match each article index number//
  switch (req.url) {
    case "/0":
      console.log("First article details:");
      console.log(allArticles[0]);
      break;
    case "/1":
      console.log("Second article details:");
      console.log(allArticles[1]);
      break;
    case "/2":
      console.log("Third article details:");
      console.log(allArticles[2]);
      break;
    case "/3":
      console.log("Fourth article details:");
      console.log(allArticles[3]);
      break;
    case "/4":
      console.log("Fifth article details:");
      console.log(allArticles[4]);
      break;
    case "/5":
      console.log("Sixth article details:");
      console.log(allArticles[5]);
      break;
    case "/6":
      console.log("Seventh article details:");
      console.log(allArticles[6]);
      break;
    case "/7":
      console.log("Eighth article details:");
      console.log(allArticles[7]);
      break;
    case "/8":
      console.log("Ninth article details:");
      console.log(allArticles[8]);
      break;
  }
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
