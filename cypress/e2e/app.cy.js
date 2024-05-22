/// <reference types="cypress"/>
import '@testing-library/cypress/add-commands';

describe('Youtube App', () => {
  beforeEach(() => {
    cy.intercept('GET', /(mostPopular)/g, {
      fixture: 'popular.json',
    });
    cy.intercept('GET', /(search)/g, {
      fixture: 'search.json',
    });
    cy.intercept('GET', /(channels)/g, {
      fixture: 'channel.json',
    });
    cy.viewport(1200, 800);
    cy.visit('/');
  });
  it('renders', () => {
    cy.findByText('Youtube').should('exist');
  });
  it('shows popular video first', () => {
    cy.findByText('Popular Video').should('exist');
  });
  it('searches by keyword', () => {
    cy.findByPlaceholderText('Search...').type('bts');
    cy.findByRole('button').click();
    cy.findByText('Search Result1').should('exist');
  });
  it('goes to detail page', () => {
    cy.findAllByRole('listitem').first().click();
    cy.findByTitle('Popular Video').should('exist');
    cy.findByText('Popular Video').should('exist');
    cy.findByText('Search Result1').should('exist');
  });
});
