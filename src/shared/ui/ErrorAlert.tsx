import { Alert } from "reactstrap";

interface ErrorAlertProps {
  message: string;
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  return <Alert color="danger">{message}</Alert>;
}
