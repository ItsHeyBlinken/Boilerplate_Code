import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { healthPayload } from "../src/shared/handlers";
import { jsonResponse, ok } from "../src/shared/response";

export const handler: APIGatewayProxyHandlerV2 = async () => {
  return jsonResponse(200, ok(healthPayload()));
};
