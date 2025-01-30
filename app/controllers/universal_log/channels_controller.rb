# frozen_string_literal: true

require_dependency 'universal_log/application_controller'

module UniversalLog
  class ChannelsController < ApplicationController
    def index
      @channels = UniversalLog::Channel.all
      @channels = @channels.scoped_to(universal_scope) unless universal_scope.nil?
      render json: @channels.map(&:to_json)
    end

    def update
      @channels = UniversalLog::Channel.where(name: params[:id])
      @channels = @channels.scoped_to(universal_scope) unless universal_scope.nil?
      @channel = @channels.first
      @channel&.update(notes: params[:notes])
      render json: @channel.to_json
    end

    def subscribe
      @channel = UniversalLog::Channel.find_by(name: params[:id])
      if params[:subscribe].to_s == '1'
        current_subscriber.push(subscribed_to_channels: params[:id])
      else
        current_subscriber.pull(subscribed_to_channels: params[:id])
      end
      render json: current_subscriber.to_json
    end
  end
end
