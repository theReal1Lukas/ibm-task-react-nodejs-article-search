import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import $ from "jquery";
import Button from "react-bootstrap/Button";

function Articles() {
  let [val, setVal] = useState("");
  const [articles, setArticles] = useState([]);
  const pattern = /^[a-zA-Z0-9\s]+$/;

  function onSubmit(props) {
    //setting errors when submitted
    if (val.length === 0) {
      $(".error-message").css("display", "block");
      $(".error-message").text("Please insert a keyword");
    } else if (pattern.test(val) === false) {
      $(".error-message").css("display", "block");
      $(".error-message").text(
        "Please use only alphanumeric + space characters "
      );
    } else {
      setVal = props.value;
      const apiKey = "2b3317379cf46e137d7045280dbc2b62";
      //getting data from api url
      fetch(`https://gnews.io/api/v4/search?q=${val}&max=9&token=${apiKey}`)
        .then((res) => res.json())
        .then(function (data) {
          if (data.totalArticles === 0) {
            $("#welcome").css("display", "block");
            $(".header").text("No articles found.");
            $(".header").css("color", "black");
          }
          setArticles(data.articles);
        });
      $(".main").css("background", "white");
      $("#welcome").css("display", "none");
      $("form").css("margin-bottom", "5vh");
    }
    setTimeout(function () {
      window.stop();
    }, 5000);
  }

  //setting error when typing
  //input keywords length

  if (val.length > 0 && val.length < 40) {
    $(".error-message-length").css("display", "none");
  } else 
  if (val.length >= 40 ) {
    $(".error-message-length").css("display", "block");
    $(".error-message-length").text("Please enter less than 40 characters");
  }

  //alphanumeric + space

  if (pattern.test(val) === true || val === "") {
    $(".error-message").css("display", "none");
  } else {
    $(".error-message").css("display", "block");
    $(".error-message").text("Please use only alphanumeric + space characters ");
  }

  return (
    <>
      <Container>
        <Row>
          <Col id="welcome" className="text-center">
            <h1 className="header">iRead</h1> <br />
          </Col>
        </Row>

        <Row className="align-items-center">
          <Col lg={3} />
          <Col className="text-center">
            <form method="post">
              <p className='error-message-length'></p>
              <p className="error-message"></p>
              <input
                maxLength="40"
                className="inputField form-control form-control-lg mb-5"
                name="article"
                placeholder="Search for an article ..."
                value={val}
                onChange={(e) => setVal(e.target.value)}
              />

              <Button
                style={{ display: "none" }}
                type="submit"
                onClick={onSubmit}
              />
            </form>
          </Col>
          <Col lg={3} />
        </Row>
      </Container>

      <Container id="cards-container">
        <Row>
          {articles.map(function (article, index) {
            function clickCard() {
              window.open(article.url, "_blank");
              //index = each card's key from 0 to 8
              fetch(`/${index}`, { method: "GET" })
                .then(function (response) {
                  if (response.ok) {
                    console.log("Click was recorded");
                    return;
                  }
                  throw new Error("Request failed.");
                })
                .catch(function (error) {
                  console.log(error);
                });
            }

            return (
              <Col id="card" key={index} md={6} lg={4}>
                <Card
                  onClick={clickCard}
                  style={{ width: "100%", margin: "20px 0 20px 0" }}
                >
                  <Card.Img
                    variant="top"
                    style={{ height: "30vh" }}
                    src={article.image}
                  />
                  <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {article.publishedAt}
                    </Card.Subtitle>
                    <Card.Text className="description">
                      {article.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Articles;
