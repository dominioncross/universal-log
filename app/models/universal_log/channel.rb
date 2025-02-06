# frozen_string_literal: true

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

    store_in collection: 'chat_channels'

    field :n, as: :name
    field :no, as: :notes

    kinds %w[public private], :private
    statuses %w[active locked archived], default: :active

    default_scope -> { order_by(name: :asc) }

    validates :scope, :name, presence: true

    def messages
      ::UniversalLog::Message.where(scope: scope, channel: name)
    end

    def to_json(*_args)
      {
        name: name,
        notes: notes,
        status: status,
        kind: kind,
        token: token,
        message_count: messages.active.count
      }
    end
  end
end
