module UniversalLog::Concerns
  module Logged
    extend ActiveSupport::Concern
    included do
      has_many :logs, as: :subject, class_name: 'UniversalLog::Message'
      
      def log!(scope, message, channel, user)
        self.logs.create scope: scope, message: message, channel: channel, user: user
      end
      
    end
    
    module ClassMethods
      def html_log_format(doc, attributes)
        h = []
        puts attributes
        attributes.each do |att|
          h.push("<div class=\"log-item\"><span class=\"log-label\">#{att[1]}:</span> <span class=\"log-value\">#{doc[att[0]]}</span></div>")
        end
        h.join('')
      end
      
    end
  end
end