import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Alert,
} from "reactstrap";
import { useGetRecordsQuery } from "@/entities/record";
import { Section } from "@/shared/ui";
import { LikertDistributionWidget } from "@/widgets/likert-distribution";
import { AverageDeltaWidget } from "@/widgets/average-delta";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;

  if (diff < MINUTE) return `${Math.floor(diff / SECOND)}s ago`;
  if (diff < HOUR) return `${Math.floor(diff / MINUTE)}m ago`;
  if (diff < DAY) return `${Math.floor(diff / HOUR)}h ago`;
  if (diff < 2 * DAY) return "yesterday";
  return new Date(timestamp).toLocaleString();
}

function tickInterval(timestamp: number): number {
  const diff = Date.now() - timestamp;
  if (diff < MINUTE) return SECOND;
  if (diff < HOUR) return MINUTE;
  return HOUR;
}

function useRelativeTime(timestamp: number | undefined): string {
  const [label, setLabel] = useState(() =>
    timestamp ? formatRelativeTime(timestamp) : "—",
  );

  useEffect(() => {
    if (!timestamp) {
      setLabel("—");
      return;
    }

    setLabel(formatRelativeTime(timestamp));

    const id = setInterval(() => {
      setLabel(formatRelativeTime(timestamp));
    }, tickInterval(timestamp));

    return () => clearInterval(id);
  }, [timestamp]);

  return label;
}

export function SurveyResultsSection() {
  const { data: records, isLoading, error, fulfilledTimeStamp } =
    useGetRecordsQuery();

  const participantCount = records?.length ?? 0;
  const lastUpdated = useRelativeTime(fulfilledTimeStamp);

  return (
    <Section animation="slide-left">
      <Container>
        <h2 className="mb-5">survey results</h2>
        <Row className="justify-content-center g-4">
          {isLoading && (
            <Col xs={12}>
              <Spinner color="light" />
            </Col>
          )}

          {error && (
            <Col md={10} lg={8}>
              <Alert color="danger" className="mb-0">
                Failed to load survey data. Please try again later.
              </Alert>
            </Col>
          )}

          {records && (
            <>
              <Col md={12}>
                <Card className="shadow-sm h-100 bg-dark text-light border-0">
                  <CardHeader
                    tag="h5"
                    className="bg-transparent border-bottom border-secondary"
                  >
                    Multi Choice Responses
                  </CardHeader>
                  <CardBody className="d-flex">
                    <LikertDistributionWidget creatorType="ai" metric="like" />
                    <LikertDistributionWidget creatorType="ai" metric="pay" />
                    <LikertDistributionWidget
                      creatorType="ai"
                      metric="profound"
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col md={12}>
                <Card className="shadow-sm h-100 bg-dark text-light border-0">
                  <CardHeader
                    tag="h5"
                    className="bg-transparent border-bottom border-secondary"
                  >
                    Multi Choice Responses
                  </CardHeader>
                  <CardBody className="d-flex">
                    <LikertDistributionWidget
                      creatorType="human"
                      metric="like"
                    />
                    <LikertDistributionWidget
                      creatorType="human"
                      metric="pay"
                    />
                    <LikertDistributionWidget
                      creatorType="human"
                      metric="profound"
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col md={12} className="mt-4">
                <p className="opacity-75">
                  The line graphs above show the combined counts for each
                  response option, grouped by AI (top) or human creator (bottom).
                </p>
              </Col>
              <Col md={12}>
                <Card className="shadow-sm h-100 bg-dark text-light border-0">
                  <CardHeader
                    tag="h5"
                    className="bg-transparent border-bottom border-secondary"
                  >
                    Multi Choice Responses
                  </CardHeader>
                  <CardBody className="d-flex">
                    <AverageDeltaWidget metric="like" />
                    <AverageDeltaWidget metric="pay" />
                    <AverageDeltaWidget metric="profound" />
                  </CardBody>
                </Card>
              </Col>

              <Col md={10} lg={8} className="mt-4">
                <p className="opacity-75">
                  the bar chart above shows the average change in ratings after
                  revealing the creator. the value is calculate by assigning
                  responses to 1-5 scale, with 'strongly disagree' = 1 and
                  'strongly agree' = 5. A positive change indicates an increase
                  in positive judgement towards an image after the participant
                  has been told the creator. And vice-versa for a negative
                  change.
                </p>
                <p
                  className="opacity-50 fst-italic mt-3"
                  style={{ fontSize: "0.85rem" }}
                >
                  live data —  {participantCount} participant
                  {participantCount !== 1 && "s"} <br />
                  <small> last updated : {lastUpdated}</small>
                </p>
              </Col>
            </>
          )}
        </Row>
      </Container>
    </Section>
  );
}
