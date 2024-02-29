import { app } from "../../../index";
import request from "supertest";

// Create user 
describe("POST /api/users create user", () => {
  it("should create a user and return 200 status", async () => {
    const payload: Record<string, string> = {
      username: "Gonel",
      password: "gonel",
      email: "gone@gmail.com"
    }

    // const expectedBodyResponse = {
    //   message: "User created successfully"
    // }

    const res = await request(app)
      .post("/api/users")
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')


      expect(res.statusCode).toEqual(200);

      /* 
        - Make sure to create test for body response
      */
      // expect(res.body).toEqual(expectedBodyResponse);  
      
  });

});

