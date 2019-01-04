class Api::TagsController < ActionController::API
    before_action :authenticate_user!, except: [:search, :trend, :show]
    def following
        @tags = User.find(current_user.id).tags.map{ |t| t.attributes }
        @tags.map! do |tag|
          tag['following'] = true
          tag
        end
        render json: @tags
    end

    def user_show
        @tag = Tag.find(params[:id]).attributes
        user_tags = current_user.tags.map{ |t| t.attributes }
        if user_tags.index(@tag) == nil
          @tag.store("following",false)
        else
          @tag.store("following", true)
        end
        render json: @tag
    end

    def show
        @tag = Tag.find(params[:id])
        render json: @tag
    end

    def user_trend
        @tags = Tag.first(10).map{ |t| t.attributes }
        user_tags = current_user.tags.map{ |t| t.attributes }
        @tags.map do |tag|
            if user_tags.index(tag) == nil
                tag.store("following",false)
            else
                tag.store("following",true)
            end
        end
        render json: @tags
    end

    def trend
        @tags = Tag.first(10)
        render json: @tags
    end

    def user_search
        if params[:keyword] && params[:keyword] != ""
            @tags = Tag.where(['name LIKE ?', "%#{params[:keyword]}%"]).map{ |t| t.attributes }
            user_tags = current_user.tags.map{ |t| t.attributes }
            @tags.map do |tag|
                if user_tags.index(tag) == nil
                    tag.store("following",false)
                else
                    tag.store("following",true)
                end
            end
            render json: @tags.first(20)
        else
            render json: []
        end
    end

    def search
        if params[:keyword] && params[:keyword] != ""
            @tags = Tag.where(['name LIKE ?', "%#{params[:keyword]}%"])
            render json: @tags.first(20)
        else
            render json: []
        end
    end
end
