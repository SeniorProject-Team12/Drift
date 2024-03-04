import { describe, expect, } from '@jest/globals';
import app from '../server';

const request = require("supertest");


describe('login route unit test', () => {
    it('checks a username and password and returns the row if one matches and checks login information', async () => {
        const username = 'jdoe';
        const pass = 'pass1234';
        const response = await request(app).post("/user/login").send({ username: username, password: pass });

        expect(response.body).toMatchObject([
            {
                "userID": 1,
                "firstName": "John",
                "lastName": "Doe",
                "username": "jdoe",
                "emailAddress": "doe20@dunder.com",
                "phoneNum": "1 (234) 000-6079",
                "password": "bd94dcda26fccb4e68d6a31f9b5aac0b571ae266d822620e901ef7ebe3a11d4f",
                "listings": null,
                "orders": null,
                "savedFolders": null
            }
        ]);

        expect(response.body).toHaveLength(1); // only one row should be sent back in the response (1 user)
        expect(response.body[0].firstName).toStrictEqual("John");
        expect(response.body[0].lastName).toStrictEqual("Doe");
        expect(response.body[0].username).toStrictEqual("jdoe");
        expect(response.body[0].emailAddress).toStrictEqual("doe20@dunder.com");
        expect(response.body[0].phoneNum).toStrictEqual("1 (234) 000-6079");
        expect(response.body[0].listings).toBeNull()
        expect(response.body[0].orders).toBeNull()
        expect(response.body[0].savedFolders).toBeNull()
        expect(200);
    })
});