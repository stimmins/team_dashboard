describe("List Widget View", function() {

  describe("render", function() {
    beforeEach(function() {
      this.model = new window.app.models.Widget({
        name: "widget 1", kind: 'list', id: 1, source: "demo", label: "demo"
      });

      this.view = new window.app.views.widgets.List({ model: this.model });
    });

    it("renders default html correctly", function() {
      this.view.render();

      var titleRow = this.view.$(".titles");
      expect(titleRow.find(":nth-child(1)")).toHaveText("Country");
      expect(titleRow.find(":nth-child(2)")).toHaveText("Count");

      var firstRow = this.view.$(".data tr:nth-child(1)");
      expect(firstRow).toHaveClass("item");
      expect(firstRow.find(":nth-child(1)")).toHaveText("China");
      expect(firstRow.find(":nth-child(2)")).toHaveText("64");

      var secondRow = this.view.$(".data tr:nth-child(2)");
      expect(secondRow).toHaveClass("item");
      expect(secondRow.find(":nth-child(1)")).toHaveText("United States");
      expect(secondRow.find(":nth-child(2)")).toHaveText("61");

      var thirdRow = this.view.$(".data tr:nth-child(3)");
      expect(thirdRow).toHaveClass("item");
      expect(thirdRow.find(":nth-child(1)")).toHaveText("United Kingdom");
      expect(thirdRow.find(":nth-child(2)")).toHaveText("38");
    });
  });

  describe("update", function() {
    beforeEach(function() {
      this.model = new window.app.models.Widget({
        name: "widget 1", kind: 'list', id: 1, source: "demo", label: "demo"
      });
      this.view = new window.app.views.widgets.List({ model: this.model });
    });

    it("fetches model again and updates view", function() {
      this.view.render();
      spyOn($, "ajax").andCallFake(function(options) {
        expect(options.url).toEqual("/api/list?source=demo");
        options.success({
          titles: [
            "Count",
            "Country"
          ],
          data: [
            [
              128,
              "United Kingdom"
            ],
            [
              64,
              "United States"
            ],
            [
              32,
              "China"
            ]
          ]
        });
      });

      this.view.update();

      var titleRow = this.view.$(".titles");
      expect(titleRow.find(":nth-child(1)")).toHaveText("Count");
      expect(titleRow.find(":nth-child(2)")).toHaveText("Country");

      var firstRow = this.view.$(".data tr:nth-child(1)");
      expect(firstRow).toHaveClass("item");
      expect(firstRow.find(":nth-child(1)")).toHaveText("128");
      expect(firstRow.find(":nth-child(2)")).toHaveText("United Kingdom");

      var secondRow = this.view.$(".data tr:nth-child(2)");
      expect(secondRow).toHaveClass("item");
      expect(secondRow.find(":nth-child(1)")).toHaveText("64");
      expect(secondRow.find(":nth-child(2)")).toHaveText("United States");

      var thirdRow = this.view.$(".data tr:nth-child(3)");
      expect(thirdRow).toHaveClass("item");
      expect(thirdRow.find(":nth-child(1)")).toHaveText("32");
      expect(thirdRow.find(":nth-child(2)")).toHaveText("China");
    });
  });
});