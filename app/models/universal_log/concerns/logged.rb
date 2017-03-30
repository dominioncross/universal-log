module UniversalLog::Concerns
  module Logged
    extend ActiveSupport::Concern
    included do
      has_many :logs, as: :subject, class_name: 'UniversalLog::Message'
      
      def log!(scope, message, channel, user)
        log = self.logs.create scope: scope, message: message, channel: channel, user: user
        logger.debug log.errors.to_json
      end
      
    end
    def self.html_log_format_value(v)
      if v.class == TrueClass
        return 'Yes'
      elsif v.class == FalseClass
        return 'No'
      elsif v.class == NilClass
        return 'N/A'
      elsif v.class == Array
        return v.join(', ')
      elsif v.class == Time
        return v.strftime('%b %d, %Y')
      elsif v.class == Date
        return v.strftime('%b %d, %Y - %I:%M%p')
      else 
        return v
      end
    end
    
    module ClassMethods
      def html_log_format(doc, attributes)
        h = []
        puts attributes
        attributes.each do |att|
          h.push("<div class=\"log-item\"><span class=\"log-label\">#{att[1]}:</span> <span class=\"log-value\">#{Logged.html_log_format_value(doc[att[0]])}</span></div>")
        end
        h.join('')
      end
    end
  end
end