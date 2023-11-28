import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import mongoose from "mongoose";
import * as request from "supertest";
describe("USERS(e2e)-TESTING", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(() => {
    mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    mongoose.disconnect();
  });

   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTY0NGFiNzdmYjM2YTFmYjVmNzE2MDEiLCJyb2xlIjoidmlldyIsImlhdCI6MTcwMTA4NDM4NywiZXhwIjoxNzAxMDg3OTg3fQ.j8oO1iumjHZiR0BuxHIYKhjd9YC4n_SMWrT_-N1FrVY"
  
});



