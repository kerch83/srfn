// https://docs.cypress.io/api/introduction/api.html

describe('Tag manager', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('ion-title', 'Tag Manager')
    cy.contains('h1', 'Manage your tags')
    cy.contains('ion-label', 'Current tags')
  })
})
