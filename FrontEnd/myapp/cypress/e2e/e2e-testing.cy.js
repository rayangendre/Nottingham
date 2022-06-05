describe("Add new user", () => {
  context("Successfull signup and login", () => {
    it("GIVEN I navigate to the signup", () => {
      cy.visit("http://localhost:3000/signup");
    });

    it("WHEN I enter user and job and submit the form", () => {
      cy.intercept("POST", "http://localhost:4000/signup").as("signUp");
      cy.get("form").within(() => {
        cy.get('input[name="uname"]').type("Mbappe");
        cy.get('input[name="pass"]').type("testpass");
        cy.get('input[type="submit"]').click();
        //Or
        //cy.contains('Submit').click()
      });
      cy.wait("@signUp");
    });

    it("THEN the user can go ahead and login", () => {
      cy.visit("http://localhost:3000/login");
      cy.intercept("POST", "http://localhost:4000/login").as("login");
      cy.get("form").within(() => {
        cy.get('input[name="uname"]').type("Mbappe");
        cy.get('input[name="pass"]').type("testpass");
        cy.get('input[type="submit"]').click();
        //Or
        //cy.contains('Submit').click( )
      });
      cy.wait("@login");
    });
  });

  context("Unsuccessful login", () => {
    it("GIVEN I navigate to the login", () => {
      cy.visit("http://localhost:3000/login");
    });

    it("WHEN I enter an invalid login", () => {
      cy.intercept("POST", "http://localhost:4000/login").as("login");
      cy.get("form").within(() => {
        cy.get('input[name="uname"]').type("Does not exist");
        cy.get('input[name="pass"]').type("invalid");
        cy.get('input[type="submit"]').click();
        //Or
        //cy.contains('Submit').click()
      });
      cy.wait("@login");
    });

    it("THEN the user is not returned to home", () => {
      cy.url().should("include", "/login");
    });
  });
});
