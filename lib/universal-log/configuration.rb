module UniversalLog
  class Configuration

    cattr_accessor :scope_class, :faye_server

    def self.reset
      self.scope_class                     = nil
      self.faye_server                     = nil
    end

  end
end
UniversalLog::Configuration.reset
