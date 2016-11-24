require_dependency "universal_chat/application_controller"

module UniversalChat
  class MessagesController < ApplicationController
    
    def index
      find_messages
      render json: @messages.map{|c| c.to_json}
    end
    
    def create
      @channels = UniversalChat::Channel.all
      @channels = @channels.scoped_to(universal_scope) if !universal_scope.nil?
      @channel = @channels.where(name: params[:channel]).first
      @channel ||= UniversalChat::Channel.create scope: universal_scope, name: params[:channel]
      
      @message = @channel.messages.new params[:message]
      @message.scope = universal_scope if !universal_scope.nil?
      if !universal_user.nil?
        @message.user = universal_user 
        @message.author = universal_user.name
      end
      if @message.save
        Blare.post("/chat/#{universal_scope.id.to_s}/new", {channel: params[:channel], author: @message.author})
      end
      find_messages
      render json: @messages.map{|c| c.to_json}
    end
    
    private
      def find_messages
        @messages = UniversalChat::Message.all
        @messages = @messages.scoped_to(universal_scope) if !universal_scope.nil?
        @messages = @messages.where(channel_name: params[:channel]) if !params[:channel].blank?
      end
    
  end
end
