describe('Join us tests', () => {
    let data;
    before(() => {
        cy.fixture('example').then((fData) => {
            data = fData;
        })
    })
    context('Join us', () => {
        it('Go to Join Us - async', () => {
            cy.visit('http://www.upscale.hu')
            cy.acceptCookies()
            cy.get('#menu-header-1 > .menu-item-type-post_type_archive > .nav-link').click()
            cy.location('pathname').should('equal', '/csatlakozz/')
        })

        it('Go to Join Us - sync', function (){
            cy.visit('http://www.upscale.hu')
            return cy.acceptCookies()
            .then(() => {
                debugger
                cy.get('#menu-header-1 > .menu-item-type-post_type_archive > .nav-link').click()
                return cy.location('pathname').should('equal', '/csatlakozz/')
            })
           
        })

        context('Filling forms', () => {
            beforeEach(() => {
                cy.visit('http://www.upscale.hu')
                cy.acceptCookies()
                cy.goToJoinUs()
                cy.get('body > div.archive-career > div > section.archive-career-form > div > div > div > form > div > div.col-lg-4.margin-bottom-30.mobile-order-1 > button').as('PleaseLetmeKnowButton')

            })

            it('Fill form', () => {
                cy.get('#archive-name').type(data.name)
                cy.get('#archive-name').should('have.value', data.name)
            })

            it('Fill form without data', () => {
                cy.get('@PleaseLetmeKnowButton').click()
                //Uncaught exception
                Cypress.on('uncaught:exception', (err, runnable) => {
                    return false;
                });
                //Span
                cy.get('#parsley-id-32').should('exist')
                cy.get('#parsley-id-32 > span').contains('A mező kitöltése kötelező.')
                cy.get('#parsley-id-34').should('exist')
                cy.get('#parsley-id-34 > span').contains('A mező kitöltése kötelező.')
                cy.get('#parsley-id-36').should('exist')
                cy.get('#parsley-id-36 > span').contains('A mező kitöltése kötelező.')
                cy.get('.parsley-custom-error-message').should('be.visible')
                cy.get('#parsley-id-multiple-knowledge-checkbox > span').contains('A csillaggal (*) jelölt mezők kitöltése kötelező.')
            })
        })
    })
})

let data;

const availablefixtures = [
    {
        "name": "onefixture",
        "context": "1"
    },
    {
        "name": "twofixture",
        "context": "2"
    }
]

describe('Filling the form with multiple value', function () {
    availablefixtures.forEach((afixture) => {
        describe(afixture.context, () => {
            before(function () {
                cy.fixture(afixture.name).then(function (fData) {
                    data = fData;
                })
            })

            it('Fill form with multiply values', () => {
                cy.visit('http://www.upscale.hu')
                cy.acceptCookies()
                cy.goToJoinUs()
                cy.fillDataAndAssert('#archive-name', data.name)
                cy.fillDataAndAssert('#archive-email', data.email)
                cy.fillDataAndAssert('#archive-linkedin', data.linkedInLink)
            })
        })
    })
})