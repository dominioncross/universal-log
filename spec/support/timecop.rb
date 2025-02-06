# frozen_string_literal: true

require 'timecop'

TIMECOP_TIME_NOW = Time.zone.local(2018, 7, 10, 3, 25).freeze

RSpec.configure do |config|
  config.before(:suite) do
    Timecop.freeze(TIMECOP_TIME_NOW)
  end

  config.after(:suite) do
    Timecop.return
  end

  config.around do |example|
    Time.use_zone('Melbourne') do
      example.run
    end
  end
end
