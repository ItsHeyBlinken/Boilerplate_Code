import type { Handler } from "@netlify/functions";
import { healthPayload } from "../../src/shared/handlers";
import { jsonResponse, ok } from "../../src/shared/response";

export const handler: Handler = async () => {
  return jsonResponse(200, ok(healthPayload()));
};
