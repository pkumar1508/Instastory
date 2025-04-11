describe("Instagram story spec", () => {
  it("check existance", () => {
    cy.visitPage("/");
    cy.wait(1500);

    cy.checkExist({ id: "[data-tid=insta-header]" });
    cy.checkExist({ id: "[data-tid=insta-logo]" });
  });

  it("check preview", () => {
    cy.visitPage("/");
    cy.wait(1500);

    cy.checkExist({ id: "[data-tid=insta-story-grid]" });
    cy.checkExist({
      id: ":nth-child(2) > .story-circle-border > .story-circle-image",
    });
    cy.clickButton({
      id: ":nth-child(2) > .story-circle-border > .story-circle-image",
    });
    cy.checkExist({ id: "[data-tid=insta-story-preview]" });
    cy.containText({ id: "[class=story-username]", value: "palash_k" });
    cy.clickButton({
      id: "[data-tid=insta-story-closebutton]",
    });
  });
});
