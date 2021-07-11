import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import $ from "jquery";
import Button from "react-bootstrap/Button";

function Articles() {
  let [val, setVal] = useState("");
  const [articles, setArticles] = useState([]);

  function onSubmit(props) {
    if (val.length === 0) {
      $(".error-message").css("display", "block");
      $(".error-message").text("Please insert a keyword");
    } else {
      setVal = props.value;
      const apiKey = "dd9b591f080dc155c2cc77f037ffb583";

      fetch(`https://gnews.io/api/v4/search?q=${val}&max=9&token=${apiKey}`)
        .then((res) => res.json())
        .then(function (data) {
          if (data.totalArticles === 0) {
            $("#welcome").css("display", "block");
            $(".header").text("No articles found.");
          }
          setArticles(data.articles);
        });
      $("#welcome").css("display", "none");
      $("form").css("margin-bottom", "5vh");
    }
  }

  if (val.length > 0 && val.length < 40) {
    $(".error-message").css("display", "none");
  } else if (val.length >= 40) {
    $(".error-message").css("display", "block");
    $(".error-message").text("Please enter less than 40 characters");
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
              <p className="error-message"></p>
              <input
                maxLength="40"
                pattern="[a-zA-Z0-9\s]+"
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
                size="lg"
                variant="warning"
              />
            </form>
          </Col>
          <Col lg={3} />
        </Row>
      </Container>

      <Container id="cards-container">
        <Row>
          {articles.map(function(article, index) {
            function clickCard() {
              window.open(article.url, "_blank");

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
                    <Card.Text>{article.description}</Card.Text>
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