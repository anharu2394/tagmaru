class Api::PostsController < ActionController::API
    before_action :authenticate_user!, only: [:following]
    def index
        tag_id = params[:tag_id]
        if params[:type] == "popular"
            @posts = Post.where(tag_id:tag_id).order("fab_count desc").uniq
            render json: @posts
        elsif params[:type] == "latest"
            @posts = Post.where(tag_id:tag_id).order("posted_at desc").uniq
            render json: @posts  
        elsif params[:type] == "trend"
            @posts = Post.where(tag_id:tag_id, posted_at: Date.today - 5..Date.today).order("fab_count desc").uniq
            render json: @posts.first(20)
        else
            render json: []
        end
    end
    def trend
        @posts = Post.where(posted_at: Date.today - 5..Date.today).order("fab_count desc").limit(20).uniq
        render json: @posts
    end
    def following
        @tags = current_user.tags
        @posts = []
        @tags.each do |tag|
            user_posts = tag.posts.map{ |t| t.attributes }
            user_posts.each_with_index do |post, i|
              p post
              name = Tag.find(post["tag_id"]).name
              user_posts[i]["tag_name"] = name
              @posts << post
            end
        end
        render json: @posts.first(20)
    end
end

