module UniversalLog
  class Channel

    include Mongoid::Document
    include Mongoid::Timestamps
    include Mongoid::Search
    include Universal::Concerns::Status
    include Universal::Concerns::Kind
    include Universal::Concerns::Taggable
    include Universal::Concerns::Scoped
    include Universal::Concerns::Tokened
    
    
    store_in session: UniversalLog::Configuration.mongoid_session_name, collection: 'chat_channels'

    field :n, as: :name
    field :no, as: :notes
    
    kinds %w(public private), :private
    statuses %w(active locked archived), default: :active
    
    default_scope ->(){order_by(name: :asc)}
    
    has_many :messages, class_name: 'UniversalLog::Message'
    
    validates :scope, :name, presence: true
    
    def to_json
      {
        name: self.name,
        notes: self.notes,
        status: self.status,
        kind: self.kind,
        token: self.token,
        message_count: self.messages.active.count
      }
    end
    
  end
end