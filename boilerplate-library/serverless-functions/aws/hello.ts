import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getGreeting } from "../src/shared/handlers";
import { fail, jsonResponse, ok } from "../src/shared/response";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const method = event.requestContext.http.method;
  if (method !== "GET" && method !== "POST") {
    return jsonResponse(405, fail("Method not allowed"));
  }

  let name = event.queryStringParameters?.name;
  if (!name && event.body) {
    try {
      const parsed = JSON.parse(event.body) as { name?: string };
      name = parsed.name;
    } catch {
      // ignore invalid JSON body
    }
  }

  return jsonResponse(200, ok({ message: getGreeting(name) }));
};
