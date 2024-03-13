import { describe, expect, } from '@jest/globals';
import app from '../server';

const request = require("supertest");

describe('get all items', () => {
    it('gets all the items from the database and returns them to use on the frontend Discover page', async () => {
        // we made less items in the database for testability
        const response = await request(app).get("/items/getAllItems");

        expect(response.body).toMatchObject(
            [
                {
                    "itemID": 1,
                    "userID": 1,
                    "name": "New Balance T-shirt",
                    "description": "Comfortable cotton T-shirt for everyday wear.",
                    "price": 10,
                    "size": "Medium",
                    "quality": "Used",
                    "brand": "New Balance",
                    "color": "Red",
                    "hashtags": "Athletic,casual,new",
                    "category": "Top",
                    "subcategory": null,
                    "photoURL": "https://www.harlem-stores.de/shop/out/pictures/generated/product/1/475_475_75/t-shirt-nb-essentials-stacked-logo-red-9920069033423.jpg",
                    "soldStatus": null
                },
                {
                    "itemID": 2,
                    "userID": 2,
                    "name": "Levi Jeans",
                    "description": "Classic denim jeans for a stylish look.",
                    "price": 29.99,
                    "size": "32x32",
                    "quality": "Used",
                    "brand": "Levi",
                    "color": "Dark Blue",
                    "hashtags": "fashion,denim",
                    "category": "Pants",
                    "subcategory": null,
                    "photoURL": "https://i5.walmartimages.com/asr/6d76dc54-4194-4a4c-a1d3-6dddebcae496.6aa386a2e73ca33bb17eaf3f68937575.jpeg",
                    "soldStatus": null
                },
                {
                    "itemID": 3,
                    "userID": 3,
                    "name": "Reformation Dress",
                    "description": "Elegant evening dress for special occasions.",
                    "price": 49.99,
                    "size": "Small",
                    "quality": "New",
                    "brand": "Reformation",
                    "color": "Black",
                    "hashtags": "fashion,formal,new",
                    "category": "Dress",
                    "subcategory": null,
                    "photoURL": "https://weselectdresses.com/wp-content/uploads/2020/10/REFORMATION-Mica-Dress-1-scaled.jpg",
                    "soldStatus": null
                }
            ]
        );
        
        expect(response.body[2].name).toStrictEqual("Reformation Dress");
        expect(response.body[2].description).toStrictEqual("Elegant evening dress for special occasions.");
        expect(response.body[2].price).toStrictEqual(49.99);
        expect(response.body[2].size).toStrictEqual("Small");
        expect(response.body[2].quality).toStrictEqual("New");
        expect(response.body[2].brand).toStrictEqual("Reformation");
        expect(response.body[2].color).toStrictEqual("Black");
        expect(response.body[2].hashtags).toStrictEqual("fashion,formal,new");
        expect(response.body[2].category).toStrictEqual("Dress");
        expect(response.body[2].subcategory).toBeNull();
        expect(response.body[2].photoURL).toStrictEqual("https://weselectdresses.com/wp-content/uploads/2020/10/REFORMATION-Mica-Dress-1-scaled.jpg");
        expect(response.body[2].soldStatus).toBeNull();
        expect(200);
    });
});