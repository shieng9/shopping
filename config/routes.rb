Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # ログイン認証
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  # 新規登録
  get    '/signup',  to: 'users#sign_up'

  root 'products#index'

  # ユーザーのデータベース
  resources :users do
  end
  # 商品購入のデータベース
  resources :products do
  end
  
end
