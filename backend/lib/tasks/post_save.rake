namespace :post_save do
     desc "記事を保存する"
    task :qiita => :environment do
        SaveQiitaPostsJob.perform_now
    end
    task :devto => :environment do
        SaveDevtoPostsJob.perform_now
    end
    task :hateb => :environment do
        SaveHatebPostsJob.perform_now
    end
    task :qrunch => :environment do
        SaveQrunchPostsJob.perform_now
    end
    task :delete => :environment do
        hash = Post.group(:url).having('count(*) >= 2').maximum(:id)
        Post.where(url: hash.keys).where.not(id: hash.values).destroy_all
    end
end

