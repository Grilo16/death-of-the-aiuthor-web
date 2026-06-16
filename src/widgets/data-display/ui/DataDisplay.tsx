import { Card, CardBody, CardHeader } from "reactstrap";
import { useGetRecordsQuery } from "@/entities/record";
import { ErrorAlert, Loader } from "@/shared/ui";

export function DataDisplay() {
  const { data, isLoading, error } = useGetRecordsQuery();

  if (isLoading) return <Loader />;
  if (error) return <ErrorAlert message={JSON.stringify(error, null, 2)} />;

  return (
    <Card className="shadow-sm">
      <CardHeader tag="h5" className="bg-dark text-light">
        Raw Response Data
      </CardHeader>
      <CardBody>
        <pre className="mb-0">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </CardBody>
    </Card>
  );
}
