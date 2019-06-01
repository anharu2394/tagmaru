class SaveQrunchPostsJob < ApplicationJob
    queue_as :default

    def perform(*args)
        Post.where(provider: "qrunch").delete_all()
        Tag.all.each do |tag|
            posts = qrunch(tag.name)
            posts.each do |post|
              Post.create(title: post[:title], url: post[:url], fab_count: post[:fab_count], image: post[:image], posted_at: post[:posted_at], provider: post[:provider], tag_id: tag.id)
            end
        end
        hash = Post.group(:url).having('count(*) >= 2').maximum(:id)
        Post.where(url: hash.keys).where.not(id: hash.values).destroy_all
    end
    def qrunch(tag_name)
        posts = []
        qrunch_uri = ["https://qrunch.net/search?q=#{tag_name}"]
        qrunch_uri.each do |uri|
            p uri + "にGETします"
            uri = URI.encode uri
            begin
                qrunch_doc = Nokogiri::HTML(open(uri,{read_timeout: nil,allow_redirections: :all}),nil,"utf-8")
                qrunch_doc.xpath('//div[@class="entry"]').each do |node|
                  link = node.css('.title > a')[0]
                    title = link.inner_text
                    url = link.attribute("href").value
                    post_uri = URI.encode "https://qrunch.net" + url
                    p post_uri
                    posted_at_s = node.css('.date')[0].inner_text # .attribute("datetime")
                    p posted_at_s
                    posted_at = Date.parse(posted_at_s)
                    p posted_at
                    fab_count = 0
                    # Get The image of OGP
                    sleep 1
                    page_doc = Nokogiri::HTML(open(post_uri,{read_timeout: nil,allow_redirections: :all}),nil,"utf-8")
                    puts post_uri + 'にGetします'
                    if page_doc.css("meta[property='og:image']").present?
                      img = page_doc.css("meta[property='og:image']").first.attributes["content"].value
                      p img
                    end
                    fab_count = page_doc.css('.claps-count')[0].inner_text.to_i
                    p fab_count

                    p posts
                    posts << {title: title, url: post_uri, fab_count: fab_count, posted_at: posted_at, provider: "qrunch", image: img}
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

