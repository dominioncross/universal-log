UniversalChat::Engine.routes.draw do
  root to: 'home#index'
  
  resources :channels
  resources :messages
  
end
