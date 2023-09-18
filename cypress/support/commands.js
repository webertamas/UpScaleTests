// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("getByData", (selector) => {
  return cy.get(`[data-test=${selector}]`)
})

Cypress.Commands.add("acceptCookies", () => {
  cy.get('.done-gdpr-button-allow > .done-gdpr-alert-box-button-middle').as('acceptCookieButton')
  cy.get('@acceptCookieButton').click()
  cy.get('@acceptCookieButton').should('not.be.visible')
})

Cypress.Commands.add("goToJoinUs", () => {
  cy.get('#menu-header-1 > .menu-item-type-post_type_archive > .nav-link').click()
  cy.location('pathname').should('equal', '/csatlakozz/')
})

Cypress.Commands.add("omitUncaughtException", (err, runnable) => {
  cy.on('uncaught:exception', (err, runnable) => {
    return false
  })
})


Cypress.Commands.add("fillDataAndAssert", (selector, any) => {
  cy.get(selector).type(any)
  cy.get(selector).should('have.value', any)
})