class UsersController < ApplicationController

  def sign_up
    @user = User.new
  end
      
  def create
    @user = User.new(users_params)
    if @user.save
      log_in @user
      redirect_to @user
      # 新規登録後に自動でログイン
    else
      render 'sign_up'
    end
  end

  private
    def users_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
  
end
