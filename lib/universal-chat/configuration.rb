module UniversalChat
  class Configuration

    cattr_accessor :scope_class, :mongoid_session_name

    def self.reset
      self.scope_class                     = nil
      self.mongoid_session_name            = :default
    end

  end
end
UniversalChat::Configuration.reset