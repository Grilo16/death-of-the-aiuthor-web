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
                  href="https://docs.google.com/forms/d/e/1FAIpQLSff564W2mq7Pd7eYOX_c9elRvPBMUHIElGHNXWjeAr9-ZnqAw/viewform?usp=dialoghttps://docs.google.com/forms/d/e/1FAIpQLSff564W2mq7Pd7eYOX_c9elRvPBMUHIElGHNXWjeAr9-ZnqAw/viewform?usp=dialog"
                  target="_blank"
                  className="rounded-pill px-3 py-3 text-white border-white bg-transparent border-white d-inline-flex align-items-center justify-content-center gap-2"
                  block
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95z" />
                  </svg>
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
