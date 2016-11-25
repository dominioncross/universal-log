UniversalChat::Engine.routes.draw do
  root to: 'home#index'
  
  resources :channels
  resources :messages
  
  get ':channel', to: 'home#index', as: :channel_path
  
end
