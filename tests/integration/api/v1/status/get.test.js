test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.postgres_version).toBeDefined();
  expect(responseBody.max_connections).toBeDefined();
  expect(responseBody.opened_connections).toBeDefined();

  expect(responseBody.postgres_version).toEqual("16.2");

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
  expect(responseBody.max_connections).toEqual(100);
  console.log(responseBody);
});

test.only("SQL Injection Test", async () => {
  const response = await fetch(
    "http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4); --",
  );
});
