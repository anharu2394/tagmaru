module Overrides
  class OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
     def omniauth_success
      get_resource_from_auth_hash
      set_token_on_resource
      create_auth_params


      sign_in(:user, @resource, store: false, bypass: false)
1      
      @resource.save!

      yield @resource if block_given?

      p @auth_params.as_json
      p @resource.as_json
      #render_data_or_redirect('deliverCredentials', @auth_params.as_json, @resource.as_json)
      #render_data('deliverCredentials',@auth_params.as_json)
      #head :ok, @auth_params
      render_data_or_redirect('deliverCredentials', @auth_params.as_json, @resource.as_json)
     end

    def assign_provider_attrs(user, auth_hash)
      p auth_hash
      all_attrs = auth_hash["info"].slice(*user.attributes.keys)
      orig_val = ActionController::Parameters.permit_all_parameters
      ActionController::Parameters.permit_all_parameters = true
      permitted_attrs = ActionController::Parameters.new(all_attrs)
      permitted_attrs.permit({})
      user.assign_attributes(permitted_attrs)
      ActionController::Parameters.permit_all_parameters = orig_val
      user
    end
  end
end
