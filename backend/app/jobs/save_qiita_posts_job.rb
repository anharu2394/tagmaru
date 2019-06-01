class SaveQiitaPostsJob < ApplicationJob
    queue_as :default

    def perform(*args)
        Post.where(provider: "qiita").delete_all()
        Tag.all.each do |tag|
            posts = qiita(tag.name)
            posts.each do |post|
                Post.create(title: post[:title], url: post[:url], fab_count: post[:fab_count], posted_at: post[:posted_at], provider: post[:provider], image:post[:image], tag_id: tag.id)
            end
        end
        hash = Post.group(:url).having('count(*) >= 2').maximum(:id)
        Post.where(url: hash.keys).where.not(id: hash.values).destroy_all
    end
    def qiita(tag_name)
        posts = []
        qiita_uri = ["https://qiita.com/tags/#{tag_name}/items","https://qiita.com/tags/#{tag_name}/items?page=2","https://qiita.com/tags/#{tag_name}/items?page=3"]
        qiita_uri.each do |uri|
            p uri + "にGETします"
            uri = URI.encode uri
            begin
                qiita_doc = Nokogiri::HTML(open(uri,{read_timeout: nil,allow_redirections: :all}),nil,"utf-8")
                qiita_doc.xpath('//div[@class="tsf-ArticleBody"]').each do |node|
                    link = node.css('a[@class="tsf-ArticleBody_title"]')[0]
                    title = link.inner_text
                    url = link.attribute("href").value
                    post_uri = URI.encode "https://qiita.com" + url + "/revisions"
                    p post_uri
                    post_doc =  Nokogiri::HTML(open(post_uri,{read_timeout: nil,allow_redirections: :all}),nil,"utf-8")
                    posted_at_s = post_doc.xpath('//time').last.text # .attribute("datetime")
                    posted_at = Date.parse(posted_at_s)
                    p posted_at
                    like_doc = Nokogiri::HTML(open(URI.encode("https://qiita.com" + url + "/likers"),{read_timeout: nil,allow_redirections: :all}),nil,"utf-8")
                    fab_count = like_doc.xpath('//li[@class="media GridList__user"]').length
                    p posts
                    posts << {title: title, url: url, fab_count: fab_count, posted_at: posted_at, provider: "qiita", image:'https://cdn.qiita.com/assets/qiita-fb-2887e7b4aad86fd8c25cea84846f2236.png'}
                end
            rescue => e
                puts "エラーが発生しました"
                p e
            end
            sleep 1
        end
        p posts.length
        return posts
    end
end
