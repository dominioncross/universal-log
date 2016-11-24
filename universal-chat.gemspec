$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "universal-chat/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "universal-chat"
  s.version     = UniversalChat::VERSION
  s.authors     = ["Ben Petro"]
  s.email       = ["benpetro@gmail.com"]
  s.homepage    = ""
  s.summary     = "Summary of UniversalChat."
  s.description = "Description of UniversalChat."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency 'rails'
  s.add_dependency 'mongoid'
  s.add_dependency 'haml'
  s.add_dependency 'universal'
  s.add_dependency 'universal-access'
  s.add_dependency 'react-rails'
  s.add_dependency 'bootstrap-sass'
  s.add_dependency 'carrierwave'
  s.add_dependency 'carrierwave-mongoid'
  
end
