describe("Url Shortener Main Page", () => {
  beforeEach(() => {
    cy.intercept("GET","http://localhost:3001/api/v1/urls", {
      urls:[ 
        {
          id: 1,
          long_url:
            "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
          short_url: "http://localhost:3001/useshorturl/1",
          title: "Awesome photo",
        },
      ]
    });
    cy.visit("http://localhost:3000/");
  });

  it("should render a header for URL Shortener web page", () => {
    cy.contains("h1", "URL Shortener");
  });

  it('should render existing shortened urls to the page', () => {
    cy.get('.url').contains('h3', 'Awesome Photo')
    cy.get('.url').contains('a', 'http://localhost:3001/useshorturl/1')
    cy.get('.url').contains('p', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  })

  it("should render a form with title, url to shorten fields, and submit shorten button", () => {
    cy.get("form").get('input[name="title"]')
    cy.get("form").get('input[name="urlToShorten"]')
    cy.get("form").contains('button', 'Shorten Please!')
  });

  it("should update the information in the input fields when user fills out form", () => {
    cy.get("form").get('input[name="title"]').type("Banana photo");
    cy.get("form").get('input[name="title"]').should("have.value", "Banana photo");
    // cy.get("form").get('input[name]="urlToShorten"]').type("");
    cy.get("form").get('input[name="urlToShorten"]').should("have.value", "Awesome photo");
  });
});
