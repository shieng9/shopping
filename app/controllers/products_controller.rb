class ProductsController < ApplicationController
  before_action :logged_in_user, only:[:index, :create]

  def index
    @product = Product.new  
    if session[:user_id]
      @current_user ||= User.find_by(id: session[:user_id])
    end
  end

  def create
    @product = Product.new(products_params)
    @current_user = User.find_by(id: session[:user_id]) 
    if @product.name == @current_user.name
      if @product.save
        redirect_to products_path
      else
        render 'index'
      end
    else
      render 'index'
    end
  end 

  private
    def products_params
      params.require(:product).permit(:name, :user_id, :goods, :quantity, :totalPrice)
    end  
end
