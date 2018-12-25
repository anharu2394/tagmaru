require 'rails_helper'
describe UsersController do
  describe 'GET #current' do
    it 'renders current user'
    it 'renders error unless successfull auth' do
      get :current
      p response
    end
  end
end
