# frozen_string_literal: true

require_dependency 'universal_log/application_controller'

module UniversalLog
  class SubscribersController < ApplicationController
    def update
      current_subscriber.update(phone_number: params[:phone_number])
      render json: current_subscriber.to_json
    end
  end
end
