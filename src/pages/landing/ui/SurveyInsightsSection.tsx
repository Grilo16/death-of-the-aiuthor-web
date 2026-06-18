import { Container, Row, Col, Spinner, Alert } from "reactstrap";
import { useGetRecordsQuery } from "@/entities/record";
import { Section, LiveDataMeta } from "@/shared/ui";
import { OpinionChangeWidget } from "@/widgets/opinion-change";
import { FirstImpressionWidget } from "@/widgets/first-impression";
import { AgeChangeWidget } from "@/widgets/age-change";

function ChartHeading({
  title,
  caption,
}: {
  title: string;
  caption: string;
}) {
  return (
    <>
      <h3 className="mb-2">{title}</h3>
      <p className="opacity-75">{caption}</p>
    </>
  );
}

export function SurveyInsightsSection() {
  const { data: records, isLoading, error, fulfilledTimeStamp } =
    useGetRecordsQuery();
  const participantCount = records?.length ?? 0;

  if (isLoading) {
    return (
      <Section>
        <Container className="text-center">
          <Spinner color="light" />
        </Container>
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <Container>
          <Alert color="danger" className="mb-0">
            Failed to load survey data. Please try again later.
          </Alert>
        </Container>
      </Section>
    );
  }

  return (
    <>
      {/* Screen 1 — Chart 1, full width */}
      <Section animation="fade-up">
        <Container>
          <ChartHeading
            title="Live results: Does knowing the creator change people's opinion?"
            caption="Visitors rate each artwork twice — once before, and once after being told whether a person or an AI made it. Each bar is the average change between those two ratings - the value is calculated by assigning responses to 1-5 scale, with 'strongly disagree' = 1 and 'strongly agree' = 5. Bars above the centre line mean people judged the work more positively after finding out the creator; bars below mean they rated it more negatively. If the bars are different heights for AI and human, this implies creatorship is a factor in how people judge the work."
          />
          <OpinionChangeWidget />
          <LiveDataMeta
            participantCount={participantCount}
            timestamp={fulfilledTimeStamp}
            className="mt-3"
          />
        </Container>
      </Section>

      {/* Screen 2 — Charts 2 and 3 side by side */}
      <Section animation="fade-up">
        <Container>
          <Row className="g-4">
            <Col xs={12} lg={6} className="d-flex flex-column">
              <ChartHeading
                title="Live results: First impressions"
                caption="The average scores people give while they still don't know who made each artwork (where scores are the judgements mapped onto a 1-5 scale). If the bars are similar heights for AI and human, this implies the different creatorship is not a factor in how people judge the work."
              />
              <FirstImpressionWidget />
            </Col>
            <Col xs={12} lg={6} className="d-flex flex-column">
              <ChartHeading
                title="Live results: Does age impact the reaction?"
                caption="This looks only at the AI-made artworks. Each bar is an age group, showing how much their average rating changed once they learned the work was made by AI. Above the line means they liked it more after finding out; below means less."
              />
              <AgeChangeWidget />
            </Col>
          </Row>
          <LiveDataMeta
            participantCount={participantCount}
            timestamp={fulfilledTimeStamp}
            className="mt-3"
          />
        </Container>
      </Section>
    </>
  );
}
