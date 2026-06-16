import { Container, Spinner } from "reactstrap";

export function Loader() {
  return (
    <Container className="d-flex justify-content-center align-items-center py-5">
      <Spinner color="primary" />
    </Container>
  );
}
