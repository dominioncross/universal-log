module UniversalLog
  class Config
    include Mongoid::Document
    include Universal::Concerns::Scoped
    include Universal::Concerns::Tokened
    
    store_in session: UniversalLog::Configuration.mongoid_session_name, collection: 'log_configs'

    field :system_name
    field :url
    field :hp, as: :hashed_password
    field :gak, as: :google_api_key
    
    def to_json
      {
        scope_id: self.scope_id.to_s,
        system_name: self.system_name,
        url: self.url,
        token: self.token,
        hashed_password: self.hashed_password,
        google_api_key: self.google_api_key
      }
    end
      
    def self.find_by_scope(scope)
      return UniversalLog::Config.find_or_create_by(scope: scope)
    end
  end
end