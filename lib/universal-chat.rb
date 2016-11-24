require "universal-chat/engine"
require "universal-chat/configuration"
Gem.find_files("universal-chat/models/*.rb").each { |path| require path }

module UniversalChat
  
  Universal::Configuration.class_name_user = 'Padlock::User'
  
end
