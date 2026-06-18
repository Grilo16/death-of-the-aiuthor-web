import { Container, Row, Col, Card, CardBody } from "reactstrap";

export function BackgroundSection() {
  return (
    <section className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={7}>
            <Card className="rounded-4 border-0" style={{backgroundColor: "#000000AA", color: "#bdbdbd"}}>
              <CardBody className="p-4 p-md-5">
                <h2 className="mb-4" style={{color:"white"}}>background</h2>
                <p>
                  The property 'human-made' is poised to become increasingly
                  valuable in a world where AI generated content saturates
                  creative spaces… Or will it? At one extreme, some people feel
                  that creative intent and authorship plays no role in the
                  meaning of an artwork – all that matters is the{" "}
                  <a href="#">viewer's experience</a>. In literature, this theory
                  is called{" "}
                  <a
                    href="https://en.wikipedia.org/wiki/The_Death_of_the_Author"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Death of the Author
                  </a>{" "}
                  (from Roland Barthes' eponymous essay). At the other extreme,
                  some people's experience of art is fully dependent on the
                  knowledge of the artist and their intent from which they draw
                  richer meaning and value. In the age of generative AI, this
                  spectrum of experience is given a new dimension – the 'AI
                  creator'. Is it a soulless, tireless machine, churning out
                  cheap knockoffs and stolen ideas, or an amalgamation of
                  humanity's creative expressions, distilled into a pure,
                  singular synthetic artist? Perhaps both, or neither? More
                  importantly, does it even matter to the viewer? And if it does,
                  what should we do about it?
                </p>
                <p>
                  To this end, we present{" "}
                  <strong className="landing-accent">
                    'Death of the A(I)uthor'
                  </strong>{" "}
                  which aims to investigate to what extent does knowledge of AI
                  authorship vs human authorship impact our perception and value
                  of art.
                </p>
                <p>
                  There are two sides to this project. First and foremost, it is
                  an interactive art installation, designed to encourage people
                  from all walks of life to reflect on their own biases and
                  reactions to AI generated art. Many studies on anti-AI bias
                  have been conducted revealing useful trends in our preference
                  for human-labeled creative work (such as{" "}
                  <a href="#">this study on visual art</a>). However in all these
                  studies, there is a tangible human experience that goes beyond
                  the recorded measurements and data analysis. Judgments come
                  easily, but self-reflection and understanding requires further
                  time and effort. It is this human experience that this
                  installation not only aims to tap into, but to expand upon by
                  giving self-reflection the space and encouragement it needs.
                  The primary goal is to push people to awareness of how they are
                  reacting to art and the idea of AI. To reflect and consider
                  their own biases.
                </p>
                <p className="mb-0">
                  The second motivation of this project is to gather data in a
                  real exhibition environment, hopefully from members of the
                  public from all walks of life. By the nature of the study,
                  results are unlikely to pass any statistical significance tests
                  and confounding factors abound. However the opportunity to
                  gather public judgments in the context of an art installation
                  is too interesting to pass up. The survey is best taken
                  in-person, however it will be available to take online even
                  after the installation has ended. An analysis of the results
                  will be presented below once enough data has been gathered.
                  Stay tuned...
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
