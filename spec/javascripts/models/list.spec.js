describe("List Model", function() {
  beforeEach(function() {
    this.model = new window.app.models.List({ source: "demo" });
  });

  it("builds url for given source param", function() {
    expect(this.model.url()).toEqual("/api/list?source=demo");
  });
});