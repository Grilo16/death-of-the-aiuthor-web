import { Section } from "@/shared/ui";
import { Container, Row, Col, Button } from "reactstrap";

export function ContactSection() {
  return (
    <Section animation="fade-up" className="py-5 text-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <h2 className="mb-3">contact</h2>
            <p>
              Want to chat or find out more? Connect with me on LinkedIn or
              contact me at{" "}
              <a href="mailto:jemima.goodall@gmail.com">
                jemima.goodall@gmail.com
              </a>
            </p>
            <Button
              outline
              tag="a"
              href="https://www.linkedin.com/in/jemima-goodall/"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-cta rounded-pill px-5 py-2 mt-3"
            >
              <strong>in</strong> Jemima Goodall
            </Button>
          </Col>
        </Row>
      </Container>
    </Section>
  );
}
