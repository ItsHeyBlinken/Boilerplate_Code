import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getGreeting } from "../src/shared/handlers";
import { fail, ok } from "../src/shared/response";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.status(405).json(fail("Method not allowed"));
    return;
  }

  const name =
    typeof req.query.name === "string"
      ? req.query.name
      : typeof req.body?.name === "string"
        ? req.body.name
        : undefined;

  res.status(200).json(ok({ message: getGreeting(name) }));
}
