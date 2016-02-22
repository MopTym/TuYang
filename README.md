![preview](logo.png)

# 圖樣

[tuyang.leanapp.cn](http://tuyang.leanapp.cn/)

## 简介

一个类似于 [Unsplash](https://unsplash.com/) 的极简图片收藏应用。图片来源于 Lofter 摄影 RSS 。

服务器每隔 6 小时会抓取一下 RSS ，解析图片大小后将至多 42 项的图片、提交者等元数据存入数据库，同时首页只显示最新的 42 项纪录，每个用户至多能收藏 42 幅图片，多出的会在移除前将其链接发送至用户邮箱。

## 主要技术栈

后端： LeanCloud + Express

前端： Vue.js + vue-loader + webpack + jade + sass + vue-waterfall + vue-router

## TODO

- [x] 抓取分析 RSS

- [x] 首页浏览

- [ ] 休息一段时间

- [ ] Loading + 延迟加载

- [ ] 用户注册登录

- [ ] 图片收藏

- [ ] 重构优化

## 权益

若此应用所展示的内容侵犯了您的权益，请通知本人删除。
