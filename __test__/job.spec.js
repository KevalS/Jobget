const app = require("../app.js"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
var fetch = require('node-fetch');
var config = require('../config/config');

describe("/job",  () => {
  it("Gets the test endpoint", async () => {
    const response =   await request.get("/job/");
    var quries = '&country=us'
    const respdata = await fetch(config.neuvooUrl+quries)
    .then(resp => resp.json())
    .then(data => {
    expect(JSON.parse(response.text).data.totalresults).toBe(data.totalresults);

    })
  }, 30000);
});
