require_dependency "universal_log/application_controller"

module UniversalLog
  class HomeController < ApplicationController
    
    def index
      if universal_user.nil? #they must be signed in
        redirect_to main_app.login_path(from: request.path)
      else
        current_channel if !universal_user.nil? and universal_user.has?(:logbook, :create_channels, universal_scope)
      end
    end

    def init
      if UniversalAccess::Configuration.scoped_user_groups
        users = Universal::Configuration.class_name_user.classify.constantize.where("_ugf.lobgook.#{universal_scope.id.to_s}" => {'$ne' => nil})
      else
        users = Universal::Configuration.class_name_user.classify.constantize.where('_ugf.lobgook' => {'$ne' => nil})
      end
      users = users.sort_by{|a| a.name}.map{|u| {name: u.name, 
          email: u.email, 
          first_name: u.name.split(' ')[0].titleize, 
          id: u.id.to_s, 
          functions: (u.universal_user_group_functions.blank? ? [] : (UniversalAccess::Configuration.scoped_user_groups ? u.universal_user_group_functions['logbook'][universal_scope.id.to_s] : u.universal_user_group_functions['logbook']))}}
      
      json = {config: universal_log_config, users: users, subscriber: current_subscriber.to_json}

      if universal_user
        json.merge!({universal_user: {
          name: universal_user.name,
          email: universal_user.email,
          functions: (universal_user.universal_user_group_functions.blank? ? [] : (UniversalAccess::Configuration.scoped_user_groups ? universal_user.universal_user_group_functions['logbook'][universal_scope.id.to_s] : universal_user.universal_user_group_functions['logbook']))
        }})
      end
      render json: json
    end
    
  end
end
