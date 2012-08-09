require "spec_helper"

describe Api::ListController do
  describe "#show" do
    it "responds successfully using the selected plugin" do
      plugin = mock('mock')
      plugin.expects(:get).returns({
          "titles" => [
              "Country",
              "Count"
          ],
          "data" => [
            [
              "China",
              64
            ],
            [
              "United States",
              61
            ],
            [
              "United Kingdom",
              38
            ]
          ]
        })
      Sources.expects(:list_plugin).with('demo').returns(plugin)
      get :show, :source => 'demo', :format => :json

      assert_response :success
      result = JSON.parse(@response.body)
      assert_equal({
          "titles" => [
              "Country",
              "Count"
          ],
          "data" => [
            [
              "China",
              64
            ],
            [
              "United States",
              61
            ],
            [
              "United Kingdom",
              38
            ]
          ]
        }, result)
    end
  end
end