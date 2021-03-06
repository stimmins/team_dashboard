module Sources
  module List
    class HttpProxy < Sources::List::Base
      def get(options = {})
        ::HttpService.request(options.fetch(:http_proxy_url))
      end
    end
  end
end