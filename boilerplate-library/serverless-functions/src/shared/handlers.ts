export function getGreeting(name?: string | null): string {
  const safeName = name?.trim() || "world";
  return `Hello, ${safeName}!`;
}

export function healthPayload() {
  return {
    status: "ok",
    service: "serverless-functions-boilerplate",
    timestamp: new Date().toISOString(),
  };
}
