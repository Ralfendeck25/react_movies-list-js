// cypress/support/e2e.js

// ***********************************************************
// Configuração global do Cypress para testes E2E
// ***********************************************************

// Importa os comandos customizados
import './commands';

// Configuração de tratamento de exceções não capturadas
Cypress.on('uncaught:exception', (err, runnable) => {
  console.error('Uncaught exception:', err);
  return false;
});

// Configuração global antes de cada teste
beforeEach(() => {
  // Redefine o estado entre os testes
  cy.window().then(win => {
    win.sessionStorage.clear();
    win.localStorage.clear();
  });

  // Configura headers comuns
  cy.intercept('**', req => {
    req.headers['accept-language'] = 'en-US,en;q=0.9';
  });
});

// Configuração para testes de acessibilidade
import 'cypress-axe';
afterEach(() => {
  cy.injectAxe();
  cy.checkA11y({
    exclude: ['.no-a11y-check'], // Ignora elementos com esta classe
  });
});

// Habilita o modo de logging detalhado
Cypress.config({
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  numTestsKeptInMemory: 10,
});

// Adiciona contexto ao relatório de testes
const addContext = require('mochawesome/addContext');
Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    const screenshot = `screenshots/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`;
    addContext({ test }, screenshot);
  }
});
