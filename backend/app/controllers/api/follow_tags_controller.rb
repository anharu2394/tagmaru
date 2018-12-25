class Api::FollowTagsController < ActionController::API
    before_action :authenticate_user!
    def create
        @follow_tag = FollowTag.new(user_id:current_user.id, tag_id: params[:tag_id])
        if @follow_tag.save
          render json: @follow_tag, status: :created, locaiton: api_follow_tags_path(@follow_tag)
        else
          render json: @follow_tag.errors, status: :unprocessable_entity
        end
    end
    def destroy
        @follow_tags = FollowTag.where(tag_id: params[:id], user_id: current_user.id)
        if @follow_tags.length != 0
            if @follow_tags.delete_all
                p @follow_tags
                render status: :no_content
            else
                render json: @follow_tags.errors, status: :unprocessable_entity
            end
        else
          render json: { status: 422, error: "You don't follow this tag."}, status: :unprocessable_entity
        end
    end
end

