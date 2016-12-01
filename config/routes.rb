UniversalLog::Engine.routes.draw do
  root to: 'home#index'
  get '/init.json', to: 'home#init'
  post '/config/set_password', to: 'config#set_password'
  post '/config/signin', to: 'config#signin'
  
  resource :config, controller: :config
  
  resources :channels
  resources :messages
  
  get ':channel', to: 'home#index', as: :channel_path
  
end
