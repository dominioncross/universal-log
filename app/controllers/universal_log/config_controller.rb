require_dependency "universal_log/application_controller"

module UniversalLog
  class ConfigController < ApplicationController
    
    def show
      respond_to do |format|
        format.json{render json: universal_log_config.to_json}
        format.html{}
      end
    end
    
    def update
      p = params.require(:config).permit(:system_name, :url, :google_api_key, :sms_url, :sms_source, :sms_username, :sms_password)
      universal_log_config.update(p)
      render json: universal_log_config.to_json
    end
    
    def set_password
      password = params[:password]
      hashed_password = Digest::SHA1.hexdigest(password)
      universal_log_config.update(hashed_password: hashed_password)
      universal_log_config.reload
      render json: universal_log_config.to_json
    end
    
    def signin
      password = params[:password]
      hashed_password = Digest::SHA1.hexdigest(password)
      render json: {signedIn: (universal_log_config.hashed_password == hashed_password)}
    end
    
  end
end