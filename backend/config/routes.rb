require 'api_constraints'


Rails.application.routes.draw do


  namespace :api,
    defaults: {format: :json},
    constraints: {subdomain: 'api' },
    path: '/' do

    scope module: :v1 do

      resources :users do
        get :search, on: :collection
        get :validate, on: :collection
        resources :organisations, only: [:index, :create]
      end

      resources :organisations, only: [:show, :update, :destroy] do
        resources :permissions, only: [:create, :destroy, :update]
        resources :teams do
          resources :permissions, only: [:create, :destroy, :update]
        end
        resources :roles do
          resources :permissions, only: [:create, :destroy, :update]
        end
      end

      resources :sessions, only: [:create, :destroy]

    end

  end

  namespace :api do
    resources :files, only: [:create]
  end

end
