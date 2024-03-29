module UniversalLog
  class ApplicationController < ::ApplicationController
    helper Universal::ApplicationHelper
    
    #need helper methods: universal_scope and universal_user
    helper_method :current_subscriber
    
    def current_subscriber
      if universal_user and universal_scope
        @current_subscriber ||= UniversalLog::Subscriber.find_or_create_by(user: universal_user, scope: universal_scope)
      end
    end
    
    def universal_log_config
      @universal_log_config ||= UniversalLog::Config.find_by_scope(universal_scope)
    end
    
    helper_method :current_channel
    
    def current_channel
      if !params[:channel].blank? and @channel.nil?
        @channel = UniversalLog::Channel.find_or_create_by(name: params[:channel].sanitize, scope: universal_scope)
      end
      return @channel.nil? ? nil : @channel.name
    end
    
  end
end
