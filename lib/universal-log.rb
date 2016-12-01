require "universal-log/engine"
require "universal-log/configuration"
Gem.find_files("universal-log/models/*.rb").each { |path| require path }

module UniversalLog
  
  Universal::Configuration.class_name_user = 'Padlock::User'
  
end
