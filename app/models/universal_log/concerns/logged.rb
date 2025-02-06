# frozen_string_literal: true

module UniversalLog
  module Concerns
    module Logged
      extend ActiveSupport::Concern
      included do
        has_many :logs, as: :subject, class_name: 'UniversalLog::Message'

        def log!(scope, message, channel, user)
          log = logs.create scope: scope, message: message, channel: channel, user: user
          logger.debug log.errors.to_json
        end
      end
      def self.html_log_format_value(val)
        if val.instance_of?(TrueClass)
          'Yes'
        elsif val.instance_of?(FalseClass)
          'No'
        elsif val.instance_of?(NilClass)
          'N/A'
        elsif val.instance_of?(Array)
          val.join(', ')
        elsif val.instance_of?(Time)
          val.strftime('%b %d, %Y')
        elsif val.instance_of?(Date)
          val.strftime('%b %d, %Y - %I:%M%p')
        else
          val
        end
      end

      module ClassMethods
        def html_log_format(doc, attributes)
          h = attributes.map do |att|
            "<div class=\"log-item\"><span class=\"log-label\">#{att[1]}:</span> <span class=\"log-value\">#{Logged.html_log_format_value(doc[att[0]])}</span></div>"
          end
          h.join
        end
      end
    end
  end
end
