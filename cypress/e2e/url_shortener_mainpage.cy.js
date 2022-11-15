describe("Url Shortener Main Page", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      body: {
        urls: [
          {
            id: 1,
            long_url:
              "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
            short_url: "http://localhost:3001/useshorturl/1",
            title: "Awesome photo",
          },
        ],
      },
    });
    cy.visit("http://localhost:3000/");
  });

  it("should render a title and existing shortened URLs to the page", () => {
    cy.contains("h1", "URL Shortener");
    cy.contains("h3", "Awesome photo");
    cy.contains("a", "http://localhost:3001/useshorturl/1");
    cy.contains(
      "p",
      "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
    );
  });

  it("should render a form with title, url to shorten fields, and submit shorten url button", () => {
    cy.get("form").get('input[name="title"]');
    cy.get("form").get('input[name="urlToShorten"]');
    cy.get("form").contains("button", "Shorten Please!");
  });

  it("should update the information in the input fields when user fills out form", () => {
    cy.get("form").get('input[name="title"]').type("Denver skyline");
    cy.get("form")
      .get('input[name="title"]')
      .should("have.value", "Denver skyline");
    cy.get("form")
      .get('input[name="urlToShorten"]')
      .type("https://unsplash.com/photos/NflJmUuaYVI");
    cy.get("form")
      .get('input[name="urlToShorten"]')
      .should("have.value", "https://unsplash.com/photos/NflJmUuaYVI");
  });

  it("should render a new shortened URL when user fills out and submits form", () => {
    cy.get("form").get('input[name="title"]').type("Denver skyline");
    cy.get("form")
      .get('input[name="title"]')
      .should("have.value", "Denver skyline");
    cy.get("form")
      .get('input[name="urlToShorten"]')
      .type("https://unsplash.com/photos/NflJmUuaYVI");
    cy.get("form")
      .get('input[name="urlToShorten"]')
      .should("have.value", "https://unsplash.com/photos/NflJmUuaYVI");
    cy.intercept("POST", "http://localhost:3001/api/v1/urls", {
      statusCode: 201,
      body: {
        id: 2,
        long_url: "https://unsplash.com/photos/NflJmUuaYVI",
        short_url: "http://localhost:3001/useshorturl/2",
        title: "Denver skyline",
      },
    });
    cy.get("button").click();
    cy.contains("h3", "Denver skyline");
    cy.contains("a", "http://localhost:3001/useshorturl/2");
    cy.contains("p", "https://unsplash.com/photos/NflJmUuaYVI");
  });

  it('should display an error message when user tries to submit the form with empty fields', () => {
    cy.get("form").get('input[name="title"]').type("Denver skyline");
    cy.get("form")
      .get('input[name="title"]')
      .should("have.value", "Denver skyline");
    cy.intercept("POST", "http://localhost:3001/api/v1/urls", 
      { message: 'Please fill out all fields'}
    );
    cy.get("button").click();
    cy.contains("p", "Please fill out all fields");
  });
});
