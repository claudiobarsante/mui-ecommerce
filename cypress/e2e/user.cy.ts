import { cy, Cypress, expect, describe, it, beforeEach } from 'local-cypress';

describe('User', () => {
  beforeEach(() => {
    cy.visit('/sign-in');
    cy.url().should('contain', Cypress.config().baseUrl + '/sign-in');
  });
  it('should sign in and sign out', () => {
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

  it('should show erros when user/password is wrong', () => {
    // -- check for am invalid email
    cy.get('#email').type('fakegmail.com');
    cy.get('#password').type('123456');
    cy.findByRole('button', { name: /Sign in/i }).click();

    cy.get('#email-helper-text').should(
      'have.text',
      '"email" must be a valid email'
    );
    // -- check for invalid length password
    cy.get('#email').clear();
    cy.get('#email').type('fake@gmail.com');
    cy.get('#password').clear();
    cy.get('#password').type('12');
    cy.findByRole('button', { name: /Sign in/i }).click();

    cy.get('#component-error-text').should(
      'have.text',
      '"password" length must be at least 6 characters long'
    );
    // -- check for an invalid username or password
    cy.get('#email').clear();
    cy.get('#email').type('fake@gmail.com');
    cy.get('#password').clear();
    cy.get('#password').type('wrong-password');
    cy.findByRole('button', { name: /Sign in/i }).click();

    cy.findByText('username or password is invalid').should('exist');
  });
});
