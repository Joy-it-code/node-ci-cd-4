import request from "supertest";
import app from "../index.js";  // Ensure ".js" extension is used

test("GET / should return Hello World!", async () => {
  const response = await request(app).get("/");
  expect(response.text).toBe("Hello World!");
});
