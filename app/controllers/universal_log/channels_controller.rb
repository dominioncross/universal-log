require_dependency "universal_log/application_controller"

module UniversalLog
  class ChannelsController < ApplicationController
    
    def index
      @channels = UniversalLog::Channel.all
      @channels = @channels.scoped_to(universal_scope) if !universal_scope.nil?
      render json: @channels.map{|c| c.to_json}
    end
    
  end
end
