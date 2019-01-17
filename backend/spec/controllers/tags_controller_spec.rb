require 'rails_helper'

describe Api::TagsController do
  describe 'GET /api/tags/:id' do
    let(:tag) { Tag.find(1)}
    let(:params) { { id: 1 }}
    before do
      get :show, params: params
      @json = JSON.parse(response.body)
    end
    it 'return 200' do 
      expect(response).to be_success
      expect(response.status).to eq(200)
    end
    it 'return the right tag' do 
      expect(tag.name).to eq @json['name']
    end
  end
  describe 'GET /api/tags/trend' do
    let(:tags) { Tag.first(10)}
    before do
      get :trend
      @json = JSON.parse(response.body)
    end
    it 'return 200' do 
      expect(response).to be_success
      expect(response.status).to eq(200)
    end
    it 'return trend tags' do 
      expect(tags.length).to eq @json.length
    end
  end
  describe 'GET /api/tags/trend' do
    let(:keyword) { 'Java' }
    let(:params) { {keyword: keyword}}
    let(:result) { Tag.where(['name LIKE ?', "%#{keyword}%"]) }
    before do
      get :search, params: params
      @json = JSON.parse(response.body)
    end
    it 'return 200' do 
      expect(response).to be_success
      expect(response.status).to eq(200)
    end
    it 'return right searched tags' do 
      expect(result.length).to eq @json.length
    end
  end
end
