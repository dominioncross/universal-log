module UniversalChat
  module Models
    module Message
      extend ActiveSupport::Concern

      included do
            
        include Mongoid::Document
        include Mongoid::Timestamps::Created
        include Mongoid::Search
        include Universal::Concerns::Status
        include Universal::Concerns::Taggable
        include Universal::Concerns::Scoped
        
        store_in session: UniversalChat::Configuration.mongoid_session_name, collection: 'chat_messages'
    
        field :a, as: :author
        field :m, as: :message
        field :cn, as: :channel_name
        
        belongs_to :channel, class_name: 'UniversalChat::Channel'
        
        statuses %w(active closed), default: :active
        
        validates :scope, :channel, :author, :message, presence: true
        
        default_scope ->(){order_by(created_at: :desc)}
        
        before_save :update_relations
        
        if !Universal::Configuration.class_name_user.blank?
          belongs_to :user, class_name: Universal::Configuration.class_name_user, foreign_key: :user_id
        end
        
        def to_json
          {
            id: self.id.to_s,
            author: self.author,
            message: self.message,
            status: self.status,
            channel: self.channel_name,
            created: self.created_at.strftime('%b %d, %Y - %-I:%M%p')
          }
        end
        
        private
          def update_relations
            self.channel_name = self.channel.name if self.channel_name.blank?
          end
        
      end
    end
  end
end