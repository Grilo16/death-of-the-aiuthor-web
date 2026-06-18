import { Container, Row, Col } from "reactstrap";
import { Section } from "@/shared/ui";

export function SummarySection() {
  return (
    <Section
      bgOpacity="light"
      animation="fade-up"
      className=" d-flex align-items-center py-5"
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
                <hr className="landing-divider mb-5" />
     
                  <h2 className="mb-4">summary</h2>
                  <p>
                    <span className="landing-accent fw-bold">tldr;</span> this
                    is an exhibition and online survey intended to investigate
                    to what extent does knowledge of AI authorship vs human
                    authorship impact our perception and value of art. the
                    installation will contain both human made and ai-generated
                    visual works and the survey is best taken in-person at the
                    event, if possible.
                  </p>
                  <p>
                    The physical installation was first presented at
                    <br />
                    <span className="landing-accent">
                      the boardwalk, glasgow, on 27-28th june 2025.
                    </span>
                  </p>
                  <p>
                    A second showing will occur in{" "}
                    <span className="landing-accent">
                      summer 2026 in edinburgh.
                    </span>
                    <br />
                    Details to be announced...
                  </p>

                <hr className="landing-divider mt-5" />
          </Col>
        </Row>
      </Container>
    </Section>
  );
}
