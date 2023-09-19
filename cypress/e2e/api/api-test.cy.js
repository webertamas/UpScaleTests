describe('API tests', () => {
    context('Gets a list of users', () => {
        it('GET /users', () => {
            cy.request("GET", "https://fakerestapi.azurewebsites.net/api/v1/Activities").then((response) => {
                expect(response.status).to.eq(200)
                expect(response).property('status').to.equal(200)
                expect(response).property('body').to.have.property('length').and.be.oneOf([30])
            })
        })

        it('GET /users  - first user', () => {
            cy.request({
                url: 'https://fakerestapi.azurewebsites.net/api/v1/Activities'
            })
                .its('body')
                .should('be.an', 'array')
                .and('have.length', 30)
                .its('0')
                .should('contain', {
                    completed: false,
                    id: 1,
                    title: "Activity 1"
                })
        })
    })

    context('Add user', () => {
        it('POST /users', () => {
            cy.request("POST", "https://fakerestapi.azurewebsites.net/api/v1/Activities",
                {
                    "id": 0,
                    "title": "string",
                    "dueDate": "2023-09-17T20:29:23.672Z",
                    "completed": true
                })
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response).property('status').to.equal(200)
                    expect(response).property('body').to.contain({
                        "id": 0,
                        "title": "string",
                        "dueDate": "2023-09-17T20:29:23.672Z",
                        "completed": true
                    })
                })
        })
    })
})