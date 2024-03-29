require 'spec_helper'

class Authentication
  include Authenticable
end

describe Authenticable do
  let (:authentication) {Authentication.new}
  subject {authentication}

  describe "#current_user" do
    before do
      @user = FactoryGirl.create :user
      request.headers["Authorization"] = @user.auth_token
      authentication.stub(:request).and_return(request)
    end

    it "returns the user from the authentication header" do
      expect(authentication.current_user.auth_token).to eql @user.auth_token
    end
  end

  describe "#authenticate_with_token" do
    before do
      @user = FactoryGirl.create :user
      authentication.stub(:current_user).and_return(nil)
      response.stub(:response_code).and_return(401)
      response.stub(:body).and_return({"errors" => "Not authenticated"}.to_json)
      authentication.stub(:response).and_return(response)
    end

    it "render a json error message" do
      expect(json_response[:errors]).to eql "Not authenticated"
    end

    it {should respond_with 401}
  end

  describe "#user_signed_in?" do
    context "when there is a user on 'session'" do
      before do
        @user = FactoryGirl.create :user
        authentication.stub(:current_user).and_return(@user)
        @current_user = authentication.current_user
      end

      it "should set current user" do
        expect(@current_user.present?).to be(true)
      end
    end

    context "when there is no user on 'session'" do
      before do
        @user = FactoryGirl.create :user
        authentication.stub(:current_user).and_return(nil)
        @current_user =  authentication.current_user
      end

      it "should not set current user" do
        expect(@current_user.present?).to be(false)
      end
    end
  end
end
