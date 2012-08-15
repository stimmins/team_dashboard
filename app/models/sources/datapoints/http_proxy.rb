module Sources
  module Datapoints
    class HttpProxy < Sources::Datapoints::Base
      def get(targets, from, to, options = {})
        url = options.fetch(:http_proxy_url)
        url = "#{url}?#{{:targets => targets, :from => from, :to => to}.to_query}"
        ::HttpService.request(url)
      end
    end
  end
end
