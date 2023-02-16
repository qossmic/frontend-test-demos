import { slowCypressDown } from 'cypress-slow-down'
// slow down each command by the default amount
// which is 1 second
slowCypressDown();

describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
    cy.get('[data-testid="loginLogoutButton"]').click();
    cy.get('[data-testid="loginUsernameField"]').type("user");
    cy.get('[data-testid="loginPasswordField"]').type("test123");
    cy.get('[data-testid="loginSubmitButton"]').click();
  });

  it("Tests the navigation", () => {
    cy.title().should("eq", "Home");

    cy.get('[data-testid="navigation"]>a').eq(0).should("have.text", "Home");
    cy.get('[data-testid="navigation"]>a').eq(1).should("have.text", "Forms");
    cy.get('[data-testid="navigation"]>a')
      .eq(3)
      .should("have.text", "Broken Link");
    let currentNav = cy.get('[data-testid="navigation"]>a').eq(0);
    currentNav.click();

    cy.url().should("equal", "http://localhost:8080/#/");

    cy.get('[data-testid="navigation"]>a').eq(0).should("have.text", "Home");
    cy.get('[data-testid="navigation"]>a').eq(1).should("have.text", "Forms");
    cy.get('[data-testid="navigation"]>a')
      .eq(3)
      .should("have.text", "Broken Link");
    currentNav = cy.get('[data-testid="navigation"]>a').eq(1);
    currentNav.click();

    cy.url().should("equal", "http://localhost:8080/#/forms");

    cy.get('[data-testid="navigation"]>a').eq(0).should("have.text", "Home");
    cy.get('[data-testid="navigation"]>a').eq(1).should("have.text", "Forms");
    cy.get('[data-testid="navigation"]>a')
      .eq(3)
      .should("have.text", "Broken Link");
    currentNav = cy.get('[data-testid="navigation"]>a').eq(3);
    currentNav.click();

    cy.url().should("equal", "http://localhost:8080/#/non-existent-path");
  });
});
