class UsersController < ApplicationController

  def sign_up
    @user = User.new
  end
      
  def create
    @user = User.new(users_params)
    if @user.save
      redirect_to login_path
    else
      render 'sign_up'
    end
  end

  private
    def users_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
  
end
