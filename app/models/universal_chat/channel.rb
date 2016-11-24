module UniversalChat
  class Channel

    include Mongoid::Document
    include Mongoid::Timestamps
    include Mongoid::Search
    include Universal::Concerns::Status
    include Universal::Concerns::Kind
    include Universal::Concerns::Taggable
    include Universal::Concerns::Scoped
    include Universal::Concerns::Tokened
    
    
    store_in session: UniversalChat::Configuration.mongoid_session_name, collection: 'chat_channels'

    field :n, as: :name
    
    kinds %w(public private), :private
    statuses %w(active locked archived), default: :active
    
    has_many :messages, class_name: 'UniversalChat::Message'
    
    validates :scope, :name, presence: true
    
    def to_json
      {
        name: self.name,
        status: self.status,
        kind: self.kind,
        token: self.token,
        message_count: self.messages.active.count
      }
    end
    
  end
end