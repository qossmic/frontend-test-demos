import { people_alternative, people_alternative_2, people_default } from "../fixtures/people_generated";
import { species_edited_values_updated } from "../fixtures/species_generated";

describe("Fixtures", () => {
    beforeEach(() => {
  
      cy.visit("http://localhost:8080/");
      cy.get('[data-testid="loginLogoutButton"]').click();
      cy.get('[data-testid="loginUsernameField"]').type("user");
      cy.get('[data-testid="loginPasswordField"]').type("test123");
      cy.get('[data-testid="loginSubmitButton"]').click();
    });
  
    it("Tests static fixtures", () => {
      
      cy.intercept("/api/species", {
        //uses string
        fixture: "species_static",
      }).as("getStaticSpecies");
      cy.intercept(/\/planets/, {
        // uses regex
        fixture: "planets_static",
      }).as("getPlanets");
  
      cy.intercept(/\/films/, {
        fixture: "films_static",
      }).as("getFilms");
  
      cy.intercept(/\/people/, {
        fixture: "people_static",
      }).as("getPeople");

      cy.visit("http://localhost:8080/#/species");
  
      cy.wait(["@getStaticSpecies"]);
  
      cy.title().should("eq", "Species");
    });

  

  it("Tests diff. generated fixtures for diff. urls", () => {
    // static intercepts
    cy.intercept(/\/species/, {
      fixture: "species_static",
    }).as("getSpecies");
    cy.intercept(/\/films/, {
      fixture: "films_static",
    });
    cy.intercept(/\/planets/, {
      fixture: "planets_static",
    });

    // gets interesting here
    cy.intercept(/\/people/, { // least specific first!
      statusCode: 200,
      body: people_default, // import any json object
    });
    cy.intercept(/\/people\/66\//, {
      statusCode: 200,
      body: people_alternative,
    });
    cy.intercept(/\/people\/67\//, {
      statusCode: 200,
      body: people_alternative_2,
    });

    cy.visit("http://localhost:8080/#/species");

    cy.wait(["@getSpecies"]);

    cy.title().should("eq", "Species");
  });

  it.only("Tests generated fixture with updated dates", () => {
    // static intercepts
    cy.intercept(/\/people/, {
      fixture: "people_static",
    }).as("getPeople");
    cy.intercept(/\/films/, {
      fixture: "films_static",
    }).as("getFilms");
    cy.intercept(/\/planets/, {
      fixture: "planets_static",
    }).as("getPlanets");

    cy.intercept(/\/species/, {
      statusCode: 200,
      body: species_edited_values_updated,
    }).as("getGeneratedSpecies");
    
    cy.visit("http://localhost:8080/#/species");

    cy.wait(["@getGeneratedSpecies"]);

    cy.title().should("eq", "Species");
  });
});
