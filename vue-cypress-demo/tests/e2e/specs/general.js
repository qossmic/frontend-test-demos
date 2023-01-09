describe("General tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
    cy.get('[data-testid="loginLogoutButton"]').click();
    cy.get('[data-testid="loginUsernameField"]').type("user");
    cy.get('[data-testid="loginPasswordField"]').type("test123");
    cy.get('[data-testid="loginSubmitButton"]').click();
  });

  it("should execute common test types", () => {
    // expect page title to contain a string
    cy.title().should("eq", "Home");

    // check for existence BY TEXT, anywhere on the page
    cy.contains("Second Headline");
    cy.contains("First Headline");

    // check for existence BY TAG, anywhere on the page
    cy.contains("h1", "Second Headline");
    cy.contains("h1", "First Headline");

    // check for correct order
    cy.get("h1:eq(1)").should("have.text", "Second Headline"); // nth-child() doesn't work
    cy.get("h1:eq(0)").should("have.text", "First Headline"); // nth-child() doesn't work

    // check for number of tags
    cy.get("h1").should("have.length", 2);

    // use test-id
    cy.get("a").should("have.length", 5);
    cy.get("[data-testid=navigation] a").should("have.length", 4);
  });

  // it.only('Focused test', () => {
  //     // *only* this test is run
  //     // since this is not appropriate for production,
  //     // many linters have a no-only rule for tests
  //     // the actual tests are irrelevant :)
  //     cy.title().should("eq", "Home");
  // });

  it.skip("Skipped test", () => {
    // this test will be skipped
    // the actual tests are irrelevant :)
    cy.title().should("eq", "Home");
    // grouped tests can be skipped with describe.skip()
  });
});

// Grouping tests:
describe("Grouped tests", () => {
  // experience shows that having only ONE describe() per file
  // keeps things from being confusing -dkb

  // in grouped tests beforeEach() can be used to do the same set-up tasks for each test
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("should have correct page title", () => {
    // note: navigating to "/" has already happened in beforeEach()
    cy.title().should("eq", "Home");
  });

  it("should test the page title again", () => {
    // note: navigating to "/" has already happened in beforeEach()
    cy.title().should("eq", "Home");
  });
});
