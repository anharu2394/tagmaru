class SaveHatebPostsJob < ApplicationJob
    queue_as :default

    def perform(*args)
        Post.where(provider: "hateb").delete_all()
        Tag.all.each do |tag|
            posts = hateb(tag.name)
            posts.each do |post|
                Post.create(title: post[:title], url: post[:url], fab_count: post[:fab_count], posted_at: post[:posted_at], provider: post[:provider], tag_id: tag.id)
            end
        end
        hash = Post.group(:url).having('count(*) >= 2').maximum(:id)
        Post.where(url: hash.keys).where.not(id: hash.values).destroy_all
    end
    def hateb(tag_name)
        posts = []
        hateb_uri = ["http://b.hatena.ne.jp/search/tag?q=#{tag_name}","http://b.hatena.ne.jp/search/tag?q=#{tag_name}&safe=on&sort=recent&users=500"]
        hateb_uri.each do |uri|
            p uri + "にGETします"
            uri = URI.encode uri
            begin
                opt = {}
                opt['User-Agent'] ="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36"
                hateb_doc = Nokogiri::HTML(open(uri,opt),nil,"utf-8")
                hateb_doc.xpath('//div[@class="centerarticle-entry "]').each do |node|
                    link = node.css('a[@class="js-clickable-link js-keyboard-openable"]')[0]
                    title = link.inner_text
                    url = link.attribute("href").value
                    posted_at_s = node.css('span[@class="entry-contents-date"]').inner_text
                    p posted_at_s
                    posted_at = Date.parse(posted_at_s)
                    fab_count = node.css('a[@class="js-keyboard-entry-page-openable"]').inner_text.split(" ")[0].to_i
                    p posts
                    posts << {title: title, url: url, fab_count: fab_count, posted_at: posted_at, provider: "hateb"}
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

