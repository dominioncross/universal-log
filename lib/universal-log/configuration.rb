module UniversalLog
  class Configuration

    cattr_accessor :scope_class, :mongoid_session_name, :faye_server

    def self.reset
      self.scope_class                     = nil
      self.faye_server                     = nil
      self.mongoid_session_name            = :default
    end

  end
end
UniversalLog::Configuration.reset