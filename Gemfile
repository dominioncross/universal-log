# frozen_string_literal: true

source 'https://rubygems.org'

# Declare your gem's dependencies in universal-log.gemspec.
# Bundler will treat runtime dependencies like base dependencies, and
# development dependencies will be added by default to the :development group.
gemspec

gem 'carrierwave', '2.1.0'
gem 'carrierwave-mongoid', '0.1.0', require: 'carrierwave/mongoid'
gem 'mongoid'
gem 'mongoid_orderable'
gem 'mongoid_search'
gem 'puma'
gem 'rmagick'

gem 'universal', git: 'https://github.com/dominioncross/universal', tag: '2.0.0'

group :development, :test do
  gem 'database_cleaner', '1.7.0'
  gem 'dotenv-rails', require: 'dotenv/load'
  gem 'factory_bot_rails'
  gem 'guard-rspec'
  gem 'guard-rubocop'
  gem 'rspec-rails'
  gem 'rubocop-rails', require: false
  gem 'rubocop-rspec', require: false
end

group :test do
  gem 'timecop'
  gem 'webmock'
end
