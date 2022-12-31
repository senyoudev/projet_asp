import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function NotFound() {
  return (
        <>
            <Row className="error">
                <Container>
                <Col className="text-center">
                    <div class="container-error-404">
                    <div class="clip">
                        <div class="shadow">
                        <span class="digit thirdDigit">4</span>
                        </div>
                    </div>
                    <div class="clip">
                        <div class="shadow">
                        <span class="digit secondDigit">0</span>
                        </div>
                    </div>
                    <div class="clip">
                        <div class="shadow">
                        <span class="digit firstDigit">4</span>
                        </div>
                    </div>
                    <div class="msg">
                        OH!<span class="triangle"></span>
                    </div>
                    </div>
                    <h2 class="h1">Sorry! Page not found</h2>
                </Col>
                </Container>
            </Row>
        </>
  );
}

export default NotFound;
