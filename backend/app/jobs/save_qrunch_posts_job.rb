class SaveQrunchPostsJob < ApplicationJob
    queue_as :default

    def perform(*args)
        Post.where(provider: "qrunch").delete_all()
        Tag.all.each do |tag|
            posts = qrunch(tag.name)
            posts.each do |post|
                Post.create(title: post[:title], url: post[:url], fab_count: post[:fab_count], posted_at: post[:posted_at], provider: post[:provider], tag_id: tag.id)
            end
        end
        hash = Post.group(:url).having('count(*) >= 2').maximum(:id)
        Post.where(url: hash.keys).where.not(id: hash.values).destroy_all
    end
    def qrunch(tag_name)
        posts = []
        qrunch_uri = ["https://qrunch.io/tags/#{tag_name}/info"]
        qrunch_uri.each do |uri|
            p uri + "にGETします"
            uri = URI.encode uri
            begin
                qrunch_doc = Nokogiri::HTML(open(uri,{read_timeout: nil,allow_redirections: :all}),nil,"utf-8")
                qrunch_doc.xpath('//div[@class="entry"]').each do |node|
                    link = node.css('h2/a')[0]
                    title = link.inner_text
                    url = link.attribute("href").value
                    post_uri = URI.encode "https://qrunch.io" + url + "/revisions"
                    p post_uri
                    posted_at_s = qrunch_doc.xpath('//div[@class="date"]').inner_text # .attribute("datetime")
                    posted_at = Date.parse(posted_at_s)
                    p posted_at
                    fab_count = 0
                    p posts
                    posts << {title: title, url: url, fab_count: fab_count, posted_at: posted_at, provider: "qrunch"}
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

