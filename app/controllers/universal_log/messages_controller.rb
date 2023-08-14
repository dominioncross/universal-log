require_dependency "universal_log/application_controller"

module UniversalLog
  class MessagesController < ApplicationController

    def index
      find_messages

      render json: messages_json
    end

    def create
      @message = UniversalLog::Message.new params[:message].to_unsafe_h
      @message.scope = universal_scope if !universal_scope.nil?
      @message.channel = current_channel
      if !universal_user.nil?
        @message.user = universal_user 
        @message.author = universal_user.name
      end
      if @message.save
        #send SMS, find subscribers to this channel
        if !universal_log_config.sms_url.blank?
          subscribers = UniversalLog::Subscriber.subscribed_to(current_channel).where(scope: universal_scope)
          require 'universal/sms_broadcast'
          subscribers.each do |subscriber|
            SmsBroadcast.send(universal_log_config, subscriber.phone_number, "#{universal_user.name} posted in the ##{current_channel} channel. #{universal_log_config.url}/#{current_channel}", current_channel)
          end
        end
      end
      find_messages
      render json: messages_json
    end

    def destroy
      @message = UniversalLog::Message.find(params[:id])
      @message.deleted!
      render json: {}
    end

    def pin
      @message = UniversalLog::Message.find(params[:id])
      @message.pin!
      render json: @message.to_json
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

      def messages_json
        per=10
        params[:page] = 1 if params[:page].blank?
        @messages = @messages.page(params[:page]).per(per)
        return {
          pagination: {
            total_count: @messages.total_count,
            page_count: @messages.total_pages,
            current_page: params[:page].to_i,
            per_page: per
          },
          messages: @messages.map{|t| t.to_json}
        }
      end

  end
end
