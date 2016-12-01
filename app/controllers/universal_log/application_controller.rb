module UniversalLog
  class ApplicationController < ::ApplicationController
    helper Universal::Engine::ApplicationHelper
    
    helper_method :current_channel
    
    def current_channel
      if !params[:channel].blank? and @channel.nil?
        @channel = UniversalLog::Channel.find_or_create_by(name: params[:channel].sanitize, scope: universal_scope)
      end
      return @channel.nil? ? nil : @channel.name
    end
    
    
  end
end
