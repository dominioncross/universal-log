# frozen_string_literal: true

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
        include Universal::Concerns::Polymorphic # A model that this message is related to

        store_in collection: 'chat_messages'

        field :a, as: :author
        field :m, as: :message
        field :sn, as: :subject_name
        field :cn, as: :channel
        field :p, as: :pinned, type: ::Mongoid::Boolean, default: false

        statuses %w[active closed deleted], default: :active

        validates :scope, :channel, :message, presence: true

        scope :for_channel, ->(channel) { where(channel: channel) }
        scope :pinned, -> { where(pinned: true) }
        default_scope -> { order_by(pinned: :desc, created_at: :desc) }

        before_save :update_relations

        unless Universal::Configuration.class_name_user.blank?
          belongs_to :user, class_name: Universal::Configuration.class_name_user, foreign_key: :user_id
        end

        def name
          message
        end

        def kind
          nil
        end

        def pin!
          update(pinned: !pinned)
        end

        def to_json(*_args)
          {
            id: id.to_s,
            author: author,
            message: message,
            status: status,
            channel: self.channel,
            subject_name: subject_name,
            pinned: pinned,
            created: created_at&.strftime('%b %d, %Y - %-I:%M%p')
          }
        end

        private

        def update_relations
          if author.blank? && !Universal::Configuration.class_name_user.blank? && !user_id.blank? && !user.nil?
            self.author = user.name
          end
          return unless !subject_id.blank? && !subject.nil?

          self.subject_name = subject.log_subject_name
        end
      end
    end
  end
end
