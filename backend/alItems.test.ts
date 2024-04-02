// const {describe, expect,} from '@jest/globals';
import { app } from './server';
const request = require('supertest');

const expectItem = 
[{
    itemID: 3,
    userID: 3,
    name: "Reformation Dress",
    description: "Elegant evening dress for special occasions.",
    price: 49.99,
    size: "Small",
    quality: "New",
    brand: "Reformation",
    color: "Black",
    hashtags: "fashion, formal, new",
    category: "Dress",
    subcategory: null,
    photoURL: "picURL",
    soldStatus: null
}]

describe('get all items', () => {
  it('gets all items', async () => {
    
    const response = await request(app).get('/items/getAllItems');
    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toMatchObject(expectItem);
   expect(response.body[0].name).toStrictEqual("Reformation Dress");
    expect(response.body[0].description).toStrictEqual("Elegant evening dress for special occasions.");
    expect(response.body[0].price).toStrictEqual(49.99);
    expect(response.body[0].size).toStrictEqual("Small");
    expect(response.body[0].quality).toStrictEqual("New");
    expect(response.body[0].brand).toStrictEqual("Reformation");
    expect(response.body[0].color).toStrictEqual("Black");
    expect(response.body[0].hashtags).toStrictEqual("fashion, formal, new");
    expect(response.body[0].category).toStrictEqual("Dress");
    expect(response.body[0].subcategory).toBeNull();
    expect(response.body[0].photoURL).toStrictEqual("https://weselectdresses.com/wp-content/uploads/2020/10/REFORMATION-Mica-Dress-1-scaled.jpg");
    expect(response.body[0].soldStatus).toBeNull();
  });
});