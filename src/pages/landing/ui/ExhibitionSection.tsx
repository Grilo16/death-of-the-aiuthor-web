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

          <h2 className="mb-1" style={{ textTransform: "capitalize" }}>The Exhibition</h2>
          <h3 className="fw-normal mb-4" style={{ textTransform: "capitalize" }}>26th June - 28th July 2026</h3>

          <p className="landing-accent fst-italic fw-normal mb-0" style={{ fontSize: "1.25rem", lineHeight: 1.2 }}>
            anthea bond exhibition room
          </p>
          <p className="landing-accent fst-italic fw-normal mb-2" style={{ fontSize: "1.25rem", lineHeight: 1.2 }}>
            at edinburgh futures institute
          </p>
          <p
            className="opacity-75 mb-4"
            style={{ letterSpacing: "0.08em", fontSize: "0.85rem" }}
          >
            In collaboration with 'Creativity, AI, and the Human' research cluster
          </p>
          <Button
            outline
            tag="a"
            href="https://efi.ed.ac.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="landing-cta rounded-pill px-5 py-2"
          >
            {"↗ "} EFI homepage
          </Button>
        </Col>
      </Row>
    </Section>
  );
}
