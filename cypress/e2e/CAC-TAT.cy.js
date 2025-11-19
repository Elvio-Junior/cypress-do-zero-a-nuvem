describe('Central de Atendimento ao Cliente TAT', () => {
  // Lesson 02 Exercise 01
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  // Lesson 02 Exercise 02, 03, 04
  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 3)

    cy.get('[id="firstName"]').type("João")
    cy.get('[id="lastName"]').type("Silva")
    cy.get('[id="email"]').type("joaosilva@email.com")
    // Lesson 02 Extra Exercise 01 cy.get('[id="open-text-area"]').type("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", { delay: 0 })
    cy.get('[id="open-text-area"]').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('[class="success"]')
      .should('be.visible')
      .and('contain.text', 'Mensagem enviada com sucesso.')

  })

  // Lesson 02 Extra Exercise 02
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('[id="firstName"]').type("João")
    cy.get('[id="lastName"]').type("Silva")
    cy.get('[id="email"]').type("joaosilva@")
    cy.get('[id="open-text-area"]').type("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890")
    cy.get('button[type="submit"]').click()

    cy.get('[class="error"]')
      .should('be.visible')
      .and('contain.text', 'Valide os campos obrigatórios!')

  })

  // Lesson 02 Extra Exercise 03
  it('campo telefone continua vazio quando preenchido com um valor não numerico', () => {
    cy.get('[id="firstName"]').type("João")
    cy.get('[id="lastName"]').type("Silva")
    cy.get('[id="email"]').type("joaosilva@email.com")
    cy.get('[id="phone"]').type("ABC")
    cy.get('[id="open-text-area"]').type("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890")
    cy.get('[id="phone-checkbox"]').check()
    cy.get('button[type="submit"]').click()

    cy.get('[class="error"]')
      .should('be.visible')
      .and('contain.text', 'Valide os campos obrigatórios!')
    cy.get('[id="phone"]').should('be.empty')

  })

  // Lesson 02 Extra Exercise 03
  it('campo telefone continua vazio quando preenchido com um valor não numerico - Curso', () => {
    cy.get('[id="phone"]')
      .type("ABC")
      .should('have.value', '')

  })

  // Lesson 02 Extra Exercise 04
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('[id="firstName"]').type("João")
    cy.get('[id="lastName"]').type("Silva")
    cy.get('[id="email"]').type("joaosilva@email.com")
    cy.get('[id="phone-checkbox"]').click()
    cy.get('[id="open-text-area"]').type("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890")
    cy.get('button[type="submit"]').click()

    cy.get('[class="error"]')
      .should('be.visible')
      .and('contain.text', 'Valide os campos obrigatórios!')

  })

  // Lesson 02 Extra Exercise 05
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('[id="firstName"]')
      .type("João")
      .should('have.value', "João")
      .clear()
      .should('have.value', '')
    cy.get('[id="lastName"]')
      .type("Silva")
      .should('have.value', "Silva")
      .clear()
      .should('have.value', '')
    cy.get('[id="email"]')
      .type("joaosilva@email.com")
      .should('have.value', "joaosilva@email.com")
      .clear()
      .should('have.value', '')
    cy.get('[id="phone"]')
      .type("123456")
      .should('have.value', "123456")
      .clear()
      .should('have.value', '')
    cy.get('[id="open-text-area"]')
      .type("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890")
      .should('have.value', "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890")
      .clear()
      .should('have.value', '')

  })

  // Lesson 02 Extra Exercise 06
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()

    cy.get('[class="error"]')
      .should('be.visible')
      .and('contain.text', 'Valide os campos obrigatórios!')

  })

  // Lesson 02 Extra Exercise 07
  it('envia o formuário com sucesso usando um comando customizado - Data', () => {
    const data = {
      firstName: "João",
      lastName: "Silva",
      email: "joaosilva@email.com",
      openTextArea: "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
      phone: 123456
    }
    cy.fillMandatoryFieldsAndSubmitData()
    cy.get('button[type="submit"]').click()

    cy.get('[class="success"]')
      .should('be.visible')
      .and('contain.text', 'Mensagem enviada com sucesso.')

  })

  // Lesson 02 Extra Exercise 08
  it('envia o formuário com sucesso usando um comando customizado - Data', () => {
    const data = {
      firstName: "João",
      lastName: "Silva",
      email: "joaosilva@email.com",
      openTextArea: "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
      phone: 123456
    }
    cy.fillMandatoryFieldsAndSubmitData()
    // Trocar .get() por .contains()
    cy.contains('button', 'Enviar').click()

    cy.get('[class="success"]')
      .should('be.visible')
      .and('contain.text', 'Mensagem enviada com sucesso.')

  })

  // Lesson 03 Exercise 01
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('[id="product"]')
      .select('YouTube')
      .should('have.value', 'youtube')

  })

  // Lesson 03 Exercise Extra 01
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('[id="product"]')
      .select('mentoria')
      .should('have.value', 'mentoria')

  })

  // Lesson 03 Exercise Extra 02
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('[id="product"]')
      .select(1)
      .should('have.value', 'blog')

  })

  // Lesson 04 Exercise 01
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
      .should('be.checked')

  })

  // Lesson 04 Exercise Extra 01
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })

  })

  // Lesson 05 Exercise 01
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  // Lesson 05 Exercise Extra 01
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário - Check', () => {
    cy.get('[id="firstName"]').type("João")
    cy.get('[id="lastName"]').type("Silva")
    cy.get('[id="email"]').type("joaosilva@email.com")
    // change function click() to check()
    cy.get('[id="phone-checkbox"]').check()
    cy.get('[id="open-text-area"]').type("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890")
    cy.get('button[type="submit"]').click()

    cy.get('[class="error"]')
      .should('be.visible')
      .and('contain.text', 'Valide os campos obrigatórios!')

  })

  //Lesson 06 Exercise 01
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('[id="file-upload"]')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })

  })

  //Lesson 06 Exercise Extra 01
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('[id="file-upload"]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })

  })

  //Lesson 06 Exercise Extra 02
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile.json')

    cy.get('[id="file-upload"]')
      .selectFile('@sampleFile.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })

  })

  //Lesson 07 Exercise 01
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {

    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  //Lesson 07 Exercise Extra 01
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {

    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click({ force: true })

    cy.contains('h1', 'CAC TAT - Política de Privacidade')

  })

  

})

