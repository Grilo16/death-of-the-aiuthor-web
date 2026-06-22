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
                    event, if possible. Live results are shown below.
                  </p>
                  <p>
                    The next showing begins{" "}
                    <span className="landing-accent">
                      26th June - 28th July 2026 at the Edinburgh Futures Institute.
                    </span>
                    <br />
                    More details below...
                  </p>
                  <p>
                    The physical installation was first presented at
                    <br />
                    <span className="landing-accent">
                      the boardwalk, glasgow, on 27-28th june 2025.
                    </span>
                  </p>

                <hr className="landing-divider mt-5" />
          </Col>
        </Row>
      </Container>
    </Section>
  );
}
