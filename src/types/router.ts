export interface RouteError {
  data: string;
  error: {
    message: string;
    stack: string;
  };
  internal: boolean;
  status: number;
  statusText: string;
}
