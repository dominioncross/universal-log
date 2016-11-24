require_dependency "universal_chat/application_controller"

module UniversalChat
  class ChannelsController < ApplicationController
    
    def index
      @channels = UniversalChat::Channel.all
      @channels = @channels.scoped_to(universal_scope) if !universal_scope.nil?
      render json: @channels.map{|c| c.to_json}
    end
    
  end
end
