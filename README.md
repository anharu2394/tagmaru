# たぐまる - Tagmaru.me with Rails API + React on Docker

## 前のたぐまる
I`d developed Tagmaru using Webpacker.
Front-End and Back-End(Web API) are **not** separated.

前のたぐまるは、Rails + React であるものの、RailsのWebpackerというものを使用しており、色々不便に感じてきたました。WwbpackerはProductionビルドは6分ほどかかります。Webpackの設定も、素のWebpackの設定が使えないので、めんどくさかったです。

## 今のたぐまる
I develop with Rails API + React.
Front-End and Back-End(Web API) are separated.
Tagmaru runs on Docker.

Rails API + React（完全分離） on Dockerに移行しました。
フロントエンドはNetlifyで動いています。

フロントエンドどバックエンドを分離させることで、より設計が綺麗になったように思えます。

サーバーが状態を持たないトークンの認証も良かったです。

![たぐまる](https://i.imgur.com/h0LP66z.png)

![たぐまる](https://i.imgur.com/ddP9W7Z.png)
