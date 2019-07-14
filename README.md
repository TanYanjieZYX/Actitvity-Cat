# 前端 Entry Task 2（React）

[需求说明](https://docs.google.com/document/d/1CGTXfkHCkfTQkMGVi0yUo6yh1GGpasfjrgzHUJcRDxc/edit#heading=h.gjdgxs)<br>
[前端设计稿](https://drive.google.com/open?id=1Byvo9t4bVs9DAVLtjzaMeDm2QmRkEDuS)<br>
[后端项目](https://git.garena.com/jinyang.li/pangolier)<br>
[后端 API 设计文档](https://docs.google.com/document/d/1G7M8M5JQzfZjGeHD7mrzDk2-M_NaR8RsBndFxs8DIEw/edit?usp=sharing)<br>

### 安装

`npm install`

### 启动

`npm start`

### 配置跨域

```json
"proxy": "http://localhost:8080/api/v1",
```

### 目录说明

```
src
|____actions                      存放actions，数据请求操作存放
|____assets                       存放静态资源
| |____fonts                         存放字体文件
| |____icons                         存放图标文件
| |____imgs                          存放图片文件
|____components                   存放公用组件，方便模块化
| |____ChannelsCard                  搜寻channel组件
| |____Comment                       评论组件
| | |____CommentBox                     评论Box
| | |____ShowToast                      评论的show toast
| |____DatePicker                    选择日期的筛选器
| |____Detail                        活动详情相关组件
| | |____DetailBottom                   活动详情底部条
| | |____DetailTitle                    活动详情头部Title条
| | |____IconMap                        going&likes头像条
| | |____Location                       活动详情地点的地图展示
| | |____Time                           活动详情时间展示
| |____Header                        导航头部
| |____IconChange                    三个图标在一起导航条
| |____ListCard                      活动列表的盒子
| |____SearchResult                  搜索结果
| |____SideSearch                    右滑search条件选择页面
| |____UserCard                      用户信息的上面用户的详情
|____constants                    存放常量
|____containers                   存放页面模块，以页面为单位
| |____Login                         登陆页面
| |____List                          活动列表页面
| |____Detail                        活动详情页面
| |____UserInfo                      用户信息页面
|____reducers                     存放reducers，存放相关数据
|____routes                       存放页面路由信息
|____scss                         存放公用样式
|____utils                        存放工具方法
|____index.js                     入口文件
|____index.scss                   入口文件样式
```

### store 设计

按页面拆分成 authReducer、eventReducer、detailReducer

```
|____reducers
| |____auth.js
| |____index.js
| |____channels.js
| |____details.js
| |____events.js
```

### 公共样式

1. 根据设计稿定义了全局的 color 变量
2. 可复用组件的样式

### color schema

> \_color.scss

```scss
$primary: #8560a9;
$primary-neutral: #67616d;
$primary-light: #d3c1e5;
$primary-dark: #453257;
$background: #faf9fc;

$complement: #d5ef7f;
$complement-dark1: #aecb4f;
$complement-dark2: #788c36;
$complement-light: #e5f7a9;

$disabled-text-light: #bababa;
$disabled-text-dark: #666;
```

### font 字体

* SourceSansPro-Regular:400
* SourceSansPro-Semibold:600
* SourceSansPro-Bold:700

### 设计稿尺寸转换

按照设计稿尺寸修改 **/src/scss/\_function.scss** 中参数，等比例适配设备。

使用`p2w()`sass function

```scss
.content-wrapper {
  width: p2w(100px);
  padding: p2w(10px 16px);
}
```

### 阿里图表库

`//at.alicdn.com/t/font_1236043_fyxogxyfsav.css`

- 第一步：引入项目下面生成的 fontclass 代码：
  `<link rel="stylesheet" href="./iconfont.css">`
- 第二步：挑选相应图标并获取类名，应用于页面：
  `<span class="iconfont icon-xxx"></span>`

### 无限虚拟滚动

### i18n 多国语言

### 项目截图
