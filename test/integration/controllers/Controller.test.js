const lifecycle = require('../../lifecycle.test');
const request = require('supertest');

beforeAll(async () => {
  await lifecycle.setup();
});

// After all tests have finished...
afterAll(async () => {
  await Goods.destroy({});
  await lifecycle.teardown();
});

describe('#goods controller', () => {
  describe('the /goods API', () => {
    test('It should response the GET method', async () => {
      const response = await request(sails.hooks.http.app)
        .get('/api/v1/goods');

      expect(response.statusCode).toBe(200);
    });

    test('It should return the goods which has coupon or is pingou', async () => {
      await Goods.createEach(
        [
          { skuid: '1', hasCoupon: true },
          { skuid: '2' },
          { skuid: '3', isPingou: true },
          { skuid: '4' },
          { skuid: '5' },
        ]
      );

      const response = await request(sails.hooks.http.app)
        .get('/api/v1/goods');

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0].skuid).toBe('1');
      expect(response.body[1].skuid).toBe('3');
      expect(response.body[2]).toBeUndefined();
    });
  });
});

describe('#category controller', () => {
  describe('the /category API', () => {
    test('It should response the GET method', async () => {
      const response = await request(sails.hooks.http.app)
        .get('/api/v1/category');

      expect(response.statusCode).toBe(200);
    });

    test('It should return all the category in GET method', async () => {
      await Category.createEach(
        [
          { name: '汽车' },
          { name: '家具' },
          { name: '母婴' },
          { name: '电器' },
        ]
      );

      const response = await request(sails.hooks.http.app)
        .get('/api/v1/category');

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(4);
    });
  });
});
