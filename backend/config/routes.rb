Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    omniauth_callbacks: "overrides/omniauth_callbacks",
  }
  namespace :api, format: 'json' do
    scope 'users' do
      get 'current', to: 'users#current'
      get 'posts', to: 'posts#following'
      get 'tags', to: 'tags#following'
      scope 'tags' do
        get 'search', to: 'tags#user_search' 
        get 'trend', to: 'tags#user_trend'
        get ':id', to: 'tags#user_show'
      end
    end
    scope 'posts' do
      get ':tag_id/:type', to: 'posts#index'
      get 'trend', to: 'posts#trend'
    end
    scope 'tags' do
      get 'search', to: 'tags#search'
      get 'trend', to: 'tags#trend'
      get ':id', to: 'tags#show'
    end
    post 'follow_tags', to: 'follow_tags#create'
    delete 'follow_tags/:id', to: 'follow_tags#destroy'
  end
end
