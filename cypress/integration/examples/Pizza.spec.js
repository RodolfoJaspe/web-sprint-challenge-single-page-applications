/// <reference types="cypress" />

describe('Pizza', ()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3000/Pizza');
    })
    const nameTextBox = () => cy.get(`input[id="name"]`);
    const pepperoni = () => cy.get(`input[id='Pepperoni']`);
    const Sausage = () => cy.get(`input[id='Sausage']`);
    const Onions = () => cy.get(`input[id='Onions']`);
    const grilledChicken = () => cy.get(`input[id='Grilled Chicken']`);
    const submitButton = ()=> cy.get(`button[type='submit']`)
    describe('Name text', ()=>{
        it('should show text provided by user', ()=>{ 
            nameTextBox()
                .type('Rodolfo')
                .should('have.value', 'Rodolfo');
               
        })
    })
    describe('Toppings',()=>{
        it('should be able to select multiple toppings', ()=>{
            pepperoni().click();
            Sausage().click();

            pepperoni().should('be.checked');
            Sausage().should('be.checked');
        })
    })
    describe("Submit Button", ()=>{
        it("it should be initially disabled", ()=>{
            submitButton().should('be.disabled');
        })
        it('should be enabled when name is at least 2 characters long', ()=>{
            nameTextBox().type('ee');
            submitButton().should('be.enabled');
        })
        it('should be disabled when name is too short', ()=>{
            nameTextBox().type('e');
            submitButton().should('be.disabled');
        })
    })
    
    it('should do some basic math', () => {
        expect(1+1).to.equal(2);
        expect(1+2).not.to.equal(4);
        expect({}).not.to.equal({}); // ===
        expect({}).to.eql({}); // ==
    });
})