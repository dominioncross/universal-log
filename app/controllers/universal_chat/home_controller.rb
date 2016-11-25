require_dependency "universal_chat/application_controller"

module UniversalChat
  class HomeController < ApplicationController
    
    def index
      if !params[:channel].blank?
        @channels = UniversalChat::Channel.all
        @channels = @channels.scoped_to(universal_scope) if !universal_scope.nil?
        @channel = @channels.where(name: params[:channel]).first
        @channel ||= UniversalChat::Channel.create scope: universal_scope, name: params[:channel]
      end
        
    end
    
  end
end
