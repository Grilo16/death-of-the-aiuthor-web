import { Row, Col, Button } from "reactstrap";
import exhibitionImg from "@/assets/images/exhibition-glitch.jpg";
import { Section } from "@/shared/ui";

export function OldExhibitionSection() {
  return (
    <Section bgOpacity="light">
        <Row className="justify-content-center text-center">
          <Col md={8} lg={6} >
            <img
              src={exhibitionImg}
              alt="Exhibition artwork"
              className="img-fluid rounded-3 mb-4"
            />

            <h2 className="mb-1 ">The Previous Exhibition</h2>
            <h3 className="fw-normal mb-4">27-28th June 2025</h3>
            <p
              className="text-uppercase opacity-75 mb-2"
              style={{ letterSpacing: "0.08em", fontSize: "0.8rem" }}
            >
              my work was part of the event
            </p>
            <p className="landing-accent fst-italic fw-bold mb-2">
              AI Can't Write Symphonies and Neither Can You
            </p>
            <p
              className="text-uppercase opacity-75 mb-4"
              style={{ letterSpacing: "0.08em", fontSize: "0.8rem" }}
            >
              presented by the scottish ai alliance
            </p>
            <Button
              outline
              tag="a"
              href="https://www.scottishai.com/ai-cant-write-symphonies"
              className="landing-cta rounded-pill px-5 py-2"
            >
              {"↗ "}Exhibition homepage
            </Button>
          </Col>
        </Row>
    </Section>
  );
}
