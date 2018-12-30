class SaveDevtoPostsJob < ApplicationJob
  queue_as :default

    def perform(*args)
        Post.where(provider: "devto").delete_all()
        Tag.all.each do |tag|
            posts = devto(tag.name)
            posts.each do |post|
                Post.create(title: post[:title], url: post[:url], fab_count: post[:fab_count], provider: post[:provider],posted_at:post[:posted_at], tag_id: tag.id)
            end
        end
        hash = Post.group(:url).having('count(*) >= 2').maximum(:id)
        Post.where(url: hash.keys).where.not(id: hash.values).destroy_all
    end
    def devto(tag_name)
        posts = []
        qiita_uri = ["https://dev.to/t/#{tag_name}","https://dev.to/t/#{tag_name}/top/week","https://dev.to/t/#{tag_name}/top/month"]
        year = Date.today.year
        qiita_uri.each do |uri|
            p uri + "にGETします"
            uri = URI.encode uri
            begin
                doc = Nokogiri::HTML(open(uri,{read_timeout: nil,allow_redirections: :all}),nil,"utf-8")
                doc.xpath('//div[@class="single-article single-article-small-pic"]').each do |node|
                    title = node.css('div[@class="content"]/h3').inner_text.gsub(/(\r\n?|\n)/,"").strip
                    url = node.css('a[@class="small-pic-link-wrapper index-article-link"]').attribute("href").value
                    fab_count = node.css('span[@class="engagement-count-number"]').inner_text.to_i
                    posted_str = node.css('h4/a').inner_text.split('・')[1]
                    month_str = posted_str[0..2]
                    month = Date.parse(month_str).month
                    day = posted_str[-2..-1].to_i
                    posted_at = Date.new(year,month,day)
                    posts << {title: title, url: url, fab_count: fab_count, provider: "devto", posted_at: posted_at}
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
