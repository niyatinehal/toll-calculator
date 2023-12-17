// tollCalculator.spec.js

describe('Toll Calculator', () => {
  beforeEach(() => {
    // Visit the page or component containing the Toll Calculator
    cy.visit('/path-to-your-toll-calculator-page');
  });

  it('should calculate toll successfully', () => {
    // Mock the API response using cy.intercept
    cy.intercept('POST', '/your-toll-api-endpoint', { fixture: 'tollResponse.json' }).as('calculateToll');

    // Type origin and destination addresses
    cy.get('#origin').type('123 Main St');
    cy.get('#destination').type('456 Oak St');

    // Select vehicle category
    cy.get('#vehicleCategory').select('Taxi');

    // Click on the Calculate Toll button
    cy.get('button').contains('Submit').click();

    // Wait for the API call to complete
    cy.wait('@calculateToll');

    // Assert that the toll result is displayed
    cy.get('.toll-calculator-container').should('contain', 'Toll Result:');

    // Add more assertions based on your expected UI
    // For example, check that the distance is displayed
    cy.get('.toll-calculator-container li').should('have.length.greaterThan', 0);
  });

  it('should swap origin and destination addresses', () => {
    // Type origin and destination addresses
    cy.get('#origin').type('123 Main St');
    cy.get('#destination').type('456 Oak St');

    // Click on the Reverse Addresses button
    cy.get('button').contains('Swap Addresses').click();

    // Assert that addresses are swapped
    cy.get('#origin').should('have.value', '456 Oak St');
    cy.get('#destination').should('have.value', '123 Main St');
  });

  // Add more test cases as needed, covering different scenarios and edge cases
});
