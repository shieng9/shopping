class SessionsController < ApplicationController
  
  def new
  end

  # ログインページから送信された情報を受け取り、ログイン処理を行うアクション
  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      log_in user
      redirect_to products_url
    else
      # ログイン失敗時のエラーメッセージ
      flash.now[:error] = 'EmailまたはPasswordが間違っています'
      render 'new'
    end
  end

  # cookieに保存されたユーザーidを削除し、ログアウトを行うアクション
  def destroy
    log_out if logged_in?
    redirect_to products_url
  end
  
end
