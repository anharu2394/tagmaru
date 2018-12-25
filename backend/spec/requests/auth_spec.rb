require 'rails_helper'
describe 'twitter login' do
  before do
    Capybara.app_host = 'http://127.0.0.1:4000'
    OmniAuth.config.test_mode = true
    OmniAuth.config.mock_auth[:twitter] = OmniAuth::AuthHash.new({
    "provider" => "twitter",
    "uid"  => "mock_uid_1234",
    "info" => {
      "name"  => "Mock User",
      "image" => "http://mock_image_url.com"
    },
    "credentials" => {
       "token"  => "mock_credentials_token",
       "secret" => "mock_credentials_secret"
    },
    "extra" => {
      "raw_info" => {
        "name" => "Mock User",
        "id"   => "mock_uid_1234"
      }
    }
  })
    Rails.application.env_config["devise.mapping"] = Devise.mappings[:user]
    Rails.application.env_config["omniauth.auth"] = OmniAuth.config.mock_auth[:twitter]
    visit '/auth/twitter'
  end
  it 'should succeed' do
    p page.html[0..5000]
    expect(page.html).to eq 200
  end
end
