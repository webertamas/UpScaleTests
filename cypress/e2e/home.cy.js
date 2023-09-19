describe('home page', () => {
  beforeEach(() => {
    cy.visit('http://www.upscale.hu')
  })

  context('Cookies', () => {
    it('Accept cookies', () => {
      cy.get('.done-gdpr-button-allow > .done-gdpr-alert-box-button-middle').as('acceptCookieButton').debug()
      cy.pause()
      cy.get('@acceptCookieButton').click()
      cy.get('@acceptCookieButton').should('not.be.visible')
    })

    it('Edit cookies settings', () => {
      cy.get('.done-gdpr-toggle-display').click()
      cy.get('#done-gdpr-popup-body-right > h2').contains('Adatvédelmi Preferencia Beállítások')
      cy.get('#done-gdpr-save-button').click()
      cy.get('#done-gdpr-popup-body-right > h2').should('not.be.visible')
    })

    it('Cookie policies', () => {
      cy.get('.done-gdpr-alert-box-body > p > a').click()
      cy.location('pathname').should('equal', '/adatkezelesi-tajekoztato/')
    })
  })
})


describe('Home page log', function () {
  it.only('Log menu', function (){
     // test step to launch a URL
     cy.visit('http://www.upscale.hu')
     cy.get('#menu-header-1 > li.menu-item.menu-item-type-post_type_archive.menu-item-object-career.menu-item-79.nav-item > a').as('joinUsBttn')
     cy.get('@joinUsBttn').should('have.text', 'Csatlakozz')
     cy.get('@joinUsBttn')
     .then(function(e){
        const t = e.text()
        // get in Console
        console.log(t)
     })
     console.log('UpScale.hu/csatlakozz teszt')
  })
})