import { cy, Cypress, expect, describe, it } from 'local-cypress';

describe('User', () => {
  it('should sign in and sign out', () => {
    cy.visit('/sign-in');
    cy.url().should('contain', Cypress.config().baseUrl + '/sign-in');

    cy.get('#email').type('fake@gmail.com');
    cy.get('#password').type('123456');

    cy.findByRole('button', { name: /Sign in/i }).click();

    // -- check on the navbar if the user is authenticated(there's a dot with green color)
    cy.get('[aria-label="user status is authenticated"]').should('exist');

    cy.get('span.MuiBadge-badge').should(
      'have.css',
      'background-color',
      'rgb(44, 177, 158)'
    );

    // todo: implement signout
  });
});
