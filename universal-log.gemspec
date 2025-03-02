# frozen_string_literal: true

$LOAD_PATH.push File.expand_path('lib', __dir__)

# Maintain your gem's version:
require 'universal-log/version'

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = 'universal-log'
  s.version     = UniversalLog::VERSION
  s.authors     = ['Ben Petro']
  s.email       = ['benpetro@gmail.com']
  s.homepage    = ''
  s.summary     = 'Summary of UniversalLog.'
  s.description = 'Description of UniversalLog.'
  s.license     = 'MIT'

  s.files = Dir['{app,config,db,lib}/**/*', 'MIT-LICENSE', 'Rakefile', 'README.rdoc']

  s.add_dependency 'bootstrap-sass'
  s.add_dependency 'carrierwave'
  s.add_dependency 'carrierwave-mongoid'
  s.add_dependency 'haml'
  s.add_dependency 'mongoid'
  s.add_dependency 'rails', '>= 6.1.7.10', '< 7.1'
  s.add_dependency 'react-rails'
  s.add_dependency 'universal'
  s.metadata['rubygems_mfa_required'] = 'true'
end
