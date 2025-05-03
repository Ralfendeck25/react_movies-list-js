describe('Movies Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the movies list', () => {
    // Verifica o container principal
    cy.getByDataCy('movies').should('be.visible').and('have.class', 'movies');

    // Verifica se os cards de filme são renderizados corretamente
    cy.getByDataCy('MovieCard')
      .should('have.length.at.least', 1)
      .each($card => {
        cy.wrap($card)
          .findByDataCy('MovieImage')
          .should('be.visible')
          .and('have.attr', 'src');

        cy.wrap($card)
          .findByDataCy('MovieTitle')
          .should('be.visible')
          .and('not.be.empty');

        cy.wrap($card)
          .findByDataCy('MovieDescription')
          .should('be.visible')
          .and('not.be.empty');

        cy.wrap($card)
          .findByDataCy('MovieLink')
          .should('be.visible')
          .and('have.attr', 'href')
          .and('include', 'imdb.com/title');
      });
  });

  it('should maintain data-cy attributes', () => {
    // Verifica atributos de teste essenciais
    cy.getByDataCy('movies').should('exist');
    cy.getByDataCy('MovieCard').should('exist');
    cy.getByDataCy('MovieImage').should('exist');
    cy.getByDataCy('MovieTitle').should('exist');
    cy.getByDataCy('MovieDescription').should('exist');
    cy.getByDataCy('MovieLink').should('exist');
  });
});