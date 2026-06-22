import { Container, Row, Col } from "reactstrap";
import jemimaImg from "@/assets/images/jemima.jpg";
import catherineImg from "@/assets/images/catherine.jpg";
import tabithaImg from "@/assets/images/tabitha.jpg";
import { Section } from "@/shared/ui/Section";

interface PersonCardProps {
  photo: string;
  name: string;
  bio: string;
}

function PersonCard({ photo, name, bio }: PersonCardProps) {
  return (
    <div className="text-center mb-5">
      <img
        src={photo}
        alt={name}
        className="landing-person-photo rounded-3 mb-3"
      />
      <h5
        className="text-uppercase mb-3"
        style={{ letterSpacing: "0.1em", fontSize: "0.95rem" }}
      >
        {name}
      </h5>
      <p className="opacity-75">{bio}</p>
    </div>
  );
}

export function PeopleSection() {
  return (
    <Section bgOpacity="light" animation="fade-up" variant="container-fluid">
      <Container>
        <hr className="landing-divider mx-auto mb-5" />

        <Row className="justify-content-center mb-5">
          <Col md={8} lg={6}>
            <h2 className="mb-4">the (human) author</h2>
            <PersonCard
              photo={jemimaImg}
              name="Jemima Goodall"
              bio="Professionally an ML research engineer, specialising in speech and language. Unprofessionally a curious and creative human. This is a personal project and my first interactive installation."
            />
          </Col>
        </Row>

        <Row className="justify-content-center mb-5">
          <Col md={8} lg={6}>
            <p className="landing-accent fw-bold">
              Please note – if you have not yet participated in the study,
              please be careful not to view any artwork from the artists or you
              may see the same artwork that is in the study and so it will no
              longer be anonymous for you, compromising the results!
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <h2 className="mb-4">the (human) artists</h2>
            <PersonCard
              photo={catherineImg}
              name="Catherine Alice Liberg"
              bio="b. 1988. Norwegian-Singaporean artist and printmaker based in Oslo. Employing a variety of printmaking techniques such as lithography, etching, aquatint, copper engraving and mezzotint, I explore questions relating to diaspora and global trade – themes that were very much facilitated by the emergence of printed matter such as maps, travel accounts and scientific illustrations."
            />
            <PersonCard
              photo={tabithaImg}
              name="Tabitha Goodall"
              bio="Oxford-born artist currently residing in Darmstadt, Germany. As an academically trained oil painter, I paint the world around me, and as a digital illustrator I bring the world inside my head to life. My inspiration comes from any nature that is close by, the characters I see inside people, and the fantasy stories from the books, films and games that I love."
            />
          </Col>
        </Row>

        <hr className="landing-divider mx-auto mt-4" />
      </Container>
    </Section>
  );
}
