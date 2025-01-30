# frozen_string_literal: true

module UniversalLog
  class Subscriber
    include Mongoid::Document
    include Universal::Concerns::Scoped
    include Universal::Concerns::Tokened

    store_in collection: 'log_subscribers'

    field :ph, as: :phone_number
    field :st, as: :subscribed_to_channels, type: Array, default: []

    scope :subscribed_to, ->(channel) { where(subscribed_to_channels: channel) }

    unless Universal::Configuration.class_name_user.blank?
      belongs_to :user, class_name: Universal::Configuration.class_name_user, foreign_key: :user_id
    end

    def to_json(*_args)
      {
        phone_number: phone_number.to_s,
        subscribed_to_channels: subscribed_to_channels
      }
    end
  end
end
