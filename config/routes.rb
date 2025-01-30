# frozen_string_literal: true

UniversalLog::Engine.routes.draw do
  root to: 'home#index'
  get '/init.json', to: 'home#init'
  post '/config/set_password', to: 'config#set_password'
  post '/config/signin', to: 'config#signin'
  patch '/:id/subscribe', to: 'channels#subscribe'

  resource :config, controller: :config

  resources :channels
  resources :subscribers
  resources :messages do
    member do
      patch :pin
    end
  end

  get ':channel', to: 'home#index', as: :channel_path
end
