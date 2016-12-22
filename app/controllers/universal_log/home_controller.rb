require_dependency "universal_log/application_controller"

module UniversalLog
  class HomeController < ApplicationController
    
    def index
        
    end
    

    def init
      users = Universal::Configuration.class_name_user.classify.constantize.where('_ugf.lobgook.0' => {'$exists' => true})
      users = users.sort_by{|a| a.name}.map{|u| {name: u.name, 
          email: u.email, 
          first_name: u.name.split(' ')[0].titleize, 
          id: u.id.to_s, 
          functions: (u.universal_user_group_functions.blank? ? [] : u.universal_user_group_functions['lobgook'])}}
      
      json = {config: universal_log_config, users: users, subscriber: current_subscriber.to_json}

      if universal_user
        json.merge!({universal_user: {
          name: universal_user.name,
          email: universal_user.email,
          functions: (universal_user.universal_user_group_functions.blank? ? [] : universal_user.universal_user_group_functions['logbook'])
        }})
      end
      render json: json
    end
    
  end
end
