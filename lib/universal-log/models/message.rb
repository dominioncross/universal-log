module UniversalLog
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
        include Universal::Concerns::Commentable
        include Universal::Concerns::Polymorphic #A model that this message is related to
        
        store_in session: UniversalLog::Configuration.mongoid_session_name, collection: 'chat_messages'
    
        field :a, as: :author
        field :m, as: :message
        field :sn, as: :subject_name
        field :cn, as: :channel
        field :p, as: :pinned, type: Boolean, default: false
        
        statuses %w(active closed deleted), default: :active
        
        validates :scope, :channel, :message, presence: true
    
        scope :for_channel, ->(channel){where(channel: channel)}
        scope :pinned, ->(){where(pinned: true)}
        default_scope ->(){order_by(pinned: :desc, created_at: :desc)}
        
        before_save :update_relations
        
        if !Universal::Configuration.class_name_user.blank?
          belongs_to :user, class_name: Universal::Configuration.class_name_user, foreign_key: :user_id
        end
        
        def pin!
          self.update(pinned: !self.pinned)
        end
        
        def to_json
          {
            id: self.id.to_s,
            author: self.author,
            message: self.message,
            status: self.status,
            channel: self.channel,
            subject_name: self.subject_name,
            pinned: self.pinned,
            created: (self.created_at.nil? ? nil : self.created_at.strftime('%b %d, %Y - %-I:%M%p'))
          }
        end
        
        private
          def update_relations
            if self.author.blank? and !Universal::Configuration.class_name_user.blank? and !self.user_id.blank? and !self.user.nil?
              self.author = self.user.name
            end
            if !self.subject_id.blank? and !self.subject.nil?
              self.subject_name = self.subject.log_subject_name
            end
          end
      end
    end
  end
end