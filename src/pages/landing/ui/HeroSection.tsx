import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { Section } from "@/shared/ui";

export function HeroSection() {
  return (
    <Section
      bgOpacity="light"
      animation="fade-in"
      className=" d-flex align-items-center py-5 min-vh-100"
    >
      <Container>
        <Row className="justify-content-center landing-hero-row"
        >
          <Col md={7} lg={6} xl={4} className="h-100">
            <Card
              className="landing-glass rounded-4 border-0 position-relative overflow-hidden h-100"
            >
              <CardBody
                className="px-5 my-5"
              >
                <h1 className="landing-hero-title mb-3"
                style={{
                    fontSize: "2.5rem",
                }}
                >
                  death of the
                  <br />
                  a(i)uthor
                </h1>
                <p
                  className="text-uppercase mb-4 opacity-75"
                  style={{
                    letterSpacing: "0.12em",
                    fontSize: "0.8rem",
                    color: "white",
                  }}
                >
                  how much do we care about AI-generated art?
                </p>
                <Button
                  tag="a"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdouV1dr2BWl_csDNWYsEufIpvi-F9XhdSpFjHUrfZZ85-wRQ/viewform?usp=dialog"
                  target="_blank"
                  className="rounded-pill px-3 py-3 text-white border-white bg-transparent border-white"
                  block
                >
                  Participate in the study
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Section>
  );
}
