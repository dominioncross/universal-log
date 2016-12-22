module UniversalLog
  class Subscriber
    include Mongoid::Document
    include Universal::Concerns::Scoped
    include Universal::Concerns::Tokened
    
    store_in session: UniversalLog::Configuration.mongoid_session_name, collection: 'log_subscribers'
    
    field :ph, as: :phone_number
    field :st, as: :subscribed_to_channels, type: Array, default: []
   
    if !Universal::Configuration.class_name_user.blank?
      belongs_to :user, class_name: Universal::Configuration.class_name_user, foreign_key: :user_id
    end
        
        
    def to_json
      {
        phone_number: self.phone_number.to_s,
        subscribed_to_channels: self.subscribed_to_channels
      } 
    end
  end
end