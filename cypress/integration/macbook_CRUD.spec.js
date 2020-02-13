context('Sample CRUD tests for a sandbox site http://computer-database.gatling.io/ to try Cypress', () => {

  const PC_NAME = Cypress.env('pc_name');
  const INTRODUCED_DATE = Cypress.env('introduced_date');
  const DISCOUNTED_DATE = Cypress.env('discounted_date');
  const COMPANY_1 = Cypress.env('company_1');
  const COMPANY_2 = Cypress.env('company_2');
  const SEARCHBOX = Cypress.env('searchbox');
  const CONFIRMATION_BOX = Cypress.env('confirmation_box');
  const OK_BTN = Cypress.env('ok_btn');
  const SUBMIT_SEARCH_BTN = Cypress.env('submit_search_btn');
  const COMPUTER_IN_LIST = "a:contains('" + PC_NAME + "')"; // workaround but I didn't find a JSON concatenation solution yet

  beforeEach(() => {
    cy.visit('/')
      .url().should('contain', '/computers')
  })

  it('Add a new macbook', () => {
    cy.get('#add').click()
      .get('#name').type(PC_NAME)
      .get('#introduced').type(INTRODUCED_DATE)
      .get('#discontinued').type(DISCOUNTED_DATE)
      .get('#company').select(COMPANY_1)
      .get('[type="submit"]').click()
      .get(CONFIRMATION_BOX).should('contain', 'Done! Computer ' + PC_NAME + ' has been created')
  })

  it('Search for the added macbook', () => {
    cy.get(SEARCHBOX)
      .type(PC_NAME).should('have.value', PC_NAME)
      .get(SUBMIT_SEARCH_BTN).click()
      .get('.computers.zebra-striped').should('exist')
      .get(COMPUTER_IN_LIST).should('contain', PC_NAME)
  })

  it('Edit the macbook info', () => {
    cy.get(SEARCHBOX)
      .type(PC_NAME).should('have.value', PC_NAME)
      .get(SUBMIT_SEARCH_BTN).click()
      .get(COMPUTER_IN_LIST).click()
      .get('#company').select(COMPANY_2)
      .get(OK_BTN).click()
      .get(CONFIRMATION_BOX).should('exist')
      .get(CONFIRMATION_BOX).should('contain', 'Done! Computer ' + PC_NAME + ' has been updated')
  })

  it('Delete the macbook', () => {
    cy.get(SEARCHBOX)
      .type(PC_NAME).should('have.value', PC_NAME)
      .get(SUBMIT_SEARCH_BTN).click()
      .get(COMPUTER_IN_LIST).click({ multiple: true })
      .get('.btn.danger').click({ force: true })
      .get(CONFIRMATION_BOX).should('exist')
      .get(CONFIRMATION_BOX).should('contain', 'Done! Computer has been deleted')
      .get(SEARCHBOX)
      .type(PC_NAME).should('have.value', PC_NAME)
      .get(SUBMIT_SEARCH_BTN).click({ force: true })
      .get('em').should('contain', 'Nothing to display')
  })

})
