class Api::UsersController < ActionController::API
  before_action :authenticate_user!
  def current
    render json: current_user
  end
end
