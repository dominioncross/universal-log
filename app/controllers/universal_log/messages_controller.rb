require_dependency "universal_log/application_controller"

module UniversalLog
  class MessagesController < ApplicationController
    
    def index
      find_messages
      render json: @messages.map{|c| c.to_json}
    end
    
    def create
      @message = UniversalLog::Message.new params[:message]
      @message.scope = universal_scope if !universal_scope.nil?
      @message.channel = current_channel
      if !universal_user.nil?
        @message.user = universal_user 
        @message.author = universal_user.name
      end
      if @message.save
        Blare.post("/log/#{universal_scope.id.to_s}/new", {channel: current_channel, author: @message.author})
      end
      find_messages
      render json: @messages.map{|c| c.to_json}
    end
    
    def destroy
      @message = UniversalLog::Message.find(params[:id])
      @message.deleted!
      render json: {}
    end
    
    def flag
      @message = UniversalLog::Message.find(params[:id])
      f = params[:flag].sanitize
      if !@message.nil?
        if @message.flagged_with?(f)
          @message.remove_flag!(f)
        else
          @message.flag!(f, universal_user)
        end
        render json: {flags: @message.flags}
      else
        render json: {flags: []}
      end
    end
    
    private
      def find_messages
        @messages = UniversalLog::Message.active
        @messages = @messages.scoped_to(universal_scope) if !universal_scope.nil?
        if !params[:keyword].blank?
          keywords = params[:keyword].split(' ')
          conditions = []
          keywords.each do |keyword|
            if !keyword.blank?
              conditions.push({'$or' => [
                {message: /\b#{keyword}/i}, 
                {author: /\b#{keyword}/i},
                {channel: /\b#{keyword}\b/i},
                {subject_name: /\b#{keyword}\b/i}
              ]})
            end
          end
          @messages = @messages.where('$and' => conditions)
        else
          @messages = @messages.where(channel: current_channel) if !current_channel.blank?
        end
      end
    
  end
end
