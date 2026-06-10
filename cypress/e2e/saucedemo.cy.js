// prueba e2e saucedemo - flujo de compra
// idemar rojas - jun 2026

describe('saucedemo - compra', () => {

  const usuario = 'standard_user'
  const pass = 'secret_sauce'

  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-test="username"]').type(usuario)
    cy.get('[data-test="password"]').type(pass)
    cy.get('[data-test="login-button"]').click()
  })

  it('login correcto lleva al inventario', () => {
    cy.url().should('include', '/inventory')
    cy.get('.title').should('have.text', 'Products')
  })

  it('compra 2 productos y confirma la orden', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

    cy.get('.shopping_cart_badge').should('have.text', '2')
    cy.get('.shopping_cart_link').click()

    // los 2 tienen que estar ahi
    cy.get('.cart_item').should('have.length', 2)
    cy.contains('Sauce Labs Backpack').should('be.visible')
    cy.contains('Sauce Labs Bike Light').should('be.visible')

    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="firstName"]').type('Idemar')
    cy.get('[data-test="lastName"]').type('Rojas')
    cy.get('[data-test="postalCode"]').type('110111')
    cy.get('[data-test="continue"]').click()

    cy.get('.cart_item').should('have.length', 2)
    cy.get('[data-test="finish"]').click()

    cy.contains('Thank you for your order!').should('be.visible')
  })

  it('password incorrecto muestra error', () => {
    // el beforeEach ya hizo login correcto, tengo que volver atras
    cy.visit('/')
    cy.get('[data-test="username"]').type(usuario)
    cy.get('[data-test="password"]').type('wrongpass')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match')
  })

})
