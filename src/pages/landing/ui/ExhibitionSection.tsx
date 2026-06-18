import { Row, Col, Button } from "reactstrap";
import exhibitionImg from "@/assets/images/efi-logo-black.png";
import { Section } from "@/shared/ui";

export function ExhibitionSection() {
  return (
    <Section bgOpacity="dark">
      <Row className="justify-content-center text-center">
        <Col md={8} lg={6}>
          <img
            style={{
              backgroundColor: "white",
              width: "25rem",
            }}
            src={exhibitionImg}
            alt="Exhibition artwork"
            className="img-fluid mb-3 rounded-3"
          />

          <h2 className="mb-1">The Exhibition</h2>
          <h3 className="fw-normal mb-4">26th June - 28th July 2026</h3>

          <p className="landing-accent fst-italic fw-bold mb-2">
            Anthea Bond Exhibition Room
          </p>
          <p className="landing-accent fst-italic fw-bold mb-2">
            at Edinburgh Futures Institute
          </p>
          <p
            className="opacity-75 mb-4"
            style={{ letterSpacing: "0.08em", fontSize: "1rem" }}
          >
            In collaboration with 'Creativity, AI, and the Human' research cluster
          </p>
          <Button
            outline
            tag="a"
            href="#"
            className="landing-cta rounded-pill px-5 py-2"
          >
            {"↗ "} EFI homepage
          </Button>
        </Col>
      </Row>
    </Section>
  );
}
