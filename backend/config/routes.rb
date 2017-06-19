require 'api_constraints'


Rails.application.routes.draw do


  namespace :api,
    defaults: {format: :json},
    constraints: {subdomain: 'api' },
    path: '/' do

    scope module: :v1, constraints: ApiConstraints.new(version: 1, default: true) do

      resources :users do
        get :search, on: :collection
        get :validate, on: :collection
        resources :organisations, only: [:index, :create]
      end

      resources :organisations, only: [:show, :update] do
        resources :permissions, only: [:create]
      end

      resources :sessions, only: [:create, :destroy]

    end

  end
  devise_for :users

end
