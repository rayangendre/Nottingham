/**
 * Feature: Backend (REST API) is listening
 * Scenario: Backend loads and runs successfully
 *    GIVEN I run the backend
 *    WHEN I visit the root endpoint
 *    AND returns "Hello World!"
 *    AND the response code is 200
 */

describe("Backend (REST API) is listening", () => {
  context("Backend loads and runs successfully", () => {
    before(() => {
      //this is a beforeAll
      //if needed
      //see more here: https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Hooks
    });

    it("GIVEN I run the backend", () => {});

    it("WHEN I visit the root endpoint", () => {
      cy.request("http://localhost:4000").then((response) => {
        assert.equal(
          response.body,
          "Hello World!",
          'AND returns "Hello World!'
        );
        assert.equal(response.status, 200, "AND the response code is 200");
      });
    });
  });
});

describe("API takes an obj and adds it to the DB", () => {
  context("Successfull post", () => {
    before(() => {});

    let user = {};

    it("GIVEN My user object has valid fields (user and job)", () => {
      user = {
        name: "Kylian Mbappe",
        watchList: ["V", "M", "PYPL"],
        portfolioList: [
          { name: "V", numShares: "2" },
          { name: "DIS", numShares: "5" },
        ],
        pwd: "TEST",
        purchase_history: [{ ticker: "V", price: 150 }],
      };
    });

    it("WHEN I attempt to post the user obj", () => {
      cy.request("POST", "http://localhost:4000/users", user).then(
        (response) => {
          //Using matchers from Chai: https://www.chaijs.com/guide/styles/#assert
          // All Cypress supported matchers here: https://docs.cypress.io/guides/references/assertions
          assert.equal(
            response.status,
            201,
            "THEN I receive a successfull response (code 201)"
          );
          assert.exists(
            response.body._id,
            "AND the response object contains the property _id"
          );
          assert.equal(
            response.body.name,
            user.name,
            "AND the response object contains the same name and job I passed"
          );
          assert.equal(
            response.body.pwd,
            user.pwd,
            "AND the response object contains the same name and job I passed"
          );
        }
      );
    });
  });

  context("Unsuccessfull post", () => {
    before(() => {});

    let user = {};

    it("GIVEN My user object has an invalid field (missing a password)", () => {
      user = {
        name: "Kylian Mbappe",
        watchList: ["V", "M", "PYPL"],
        portfolioList: [
          { name: "V", numShares: "2" },
          { name: "DIS", numShares: "5" },
        ],
      };
    });

    it("WHEN I attempt to post the user obj", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:4000/users",
        body: user,
        failOnStatusCode: false,
      }).then((response) => {
        //Using matchers from Chai: https://www.chaijs.com/guide/styles/#assert
        //All Cypress supported matchers here: https://docs.cypress.io/guides/references/assertions
        assert.equal(
          response.status,
          500,
          "THEN I receive a failure response (code 400)"
        );
        assert.notExists(response.body, "AND there's no response obj");
      });
    });
  });
});
