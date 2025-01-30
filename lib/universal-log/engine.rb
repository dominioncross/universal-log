# frozen_string_literal: true

module UniversalLog
  class Engine < ::Rails::Engine
    isolate_namespace UniversalLog

    config.after_initialize do
      Universal::Configuration.class_name_user = 'Padlock::User'
      UniversalLog::Configuration.reset
    end
  end
end
