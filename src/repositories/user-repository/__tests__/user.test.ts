import { app } from "../../../index";
import request from "supertest";

// Create user 
describe("POST /api/users create user", () => {
  it("should create a user and return 200 status", async () => {
    const payload: Record<string, string> = {
      username: "Gon",
      password: "gon",
      email: "gon@gmail.com"
    }

    const res = await request(app)
      .post("/api/users")
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(200);
  });

});

