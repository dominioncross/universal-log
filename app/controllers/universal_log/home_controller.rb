# frozen_string_literal: true

require_dependency 'universal_log/application_controller'

module UniversalLog
  class HomeController < ApplicationController
    def index
      if universal_user.nil? # they must be signed in
        redirect_to main_app.login_path(from: request.path)
      elsif !universal_user.nil? && universal_user.has?(:logbook, :create_channels, universal_scope)
        current_channel
      end
    end

    def init
      if UniversalAccess::Configuration.scoped_user_groups
        users = Universal::Configuration.class_name_user.classify.constantize.where("_ugf.lobgook.#{universal_scope.id}" => { '$ne' => nil })
      else
        users = Universal::Configuration.class_name_user.classify.constantize.where('_ugf.lobgook' => { '$ne' => nil })
      end
      users = users.sort_by(&:name).map do |u|
        { name: u.name,
          email: u.email,
          first_name: u.name.split[0].titleize,
          id: u.id.to_s,
          functions: (if u.universal_user_group_functions.blank?
                        []
                      else
                        (UniversalAccess::Configuration.scoped_user_groups ? u.universal_user_group_functions['logbook'][universal_scope.id.to_s] : u.universal_user_group_functions['logbook'])
                      end) }
      end

      json = { config: universal_log_config, users: users, subscriber: current_subscriber.to_json }

      if universal_user
        json.merge!({ universal_user: {
                      name: universal_user.name,
                      email: universal_user.email,
                      functions: (if universal_user.universal_user_group_functions.blank?
                                    []
                                  else
                                    (UniversalAccess::Configuration.scoped_user_groups ? universal_user.universal_user_group_functions['logbook'][universal_scope.id.to_s] : universal_user.universal_user_group_functions['logbook'])
                                  end)
                    } })
      end
      render json: json
    end
  end
end
