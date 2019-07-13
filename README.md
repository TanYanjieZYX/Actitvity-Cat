# 前端 Entry Task 2（React）
[需求说明](https://docs.google.com/document/d/1CGTXfkHCkfTQkMGVi0yUo6yh1GGpasfjrgzHUJcRDxc/edit#heading=h.gjdgxs)<br>
[前端设计稿](https://drive.google.com/open?id=1Byvo9t4bVs9DAVLtjzaMeDm2QmRkEDuS)<br>
[后端项目](https://git.garena.com/jinyang.li/pangolier)<br>
[后端API设计文档](https://docs.google.com/document/d/1G7M8M5JQzfZjGeHD7mrzDk2-M_NaR8RsBndFxs8DIEw/edit?usp=sharing)<br>

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
|____index.scss
| |____index.js                      入口文件
| |____common                        公共文件夹
| | |____components                  存放公共组件
| | |____const.js                    存放常量
| | |____utils.js                    存放公共方法
| |____actions                       存放actions
| |____api                           存放后端api
| |____assets                        存放静态资源
| | |____imgs                        存放图片资源
| | |____svgs                        存放svg资源
| | |____common.scss                 公共样式
| |____pages                         存放页面模块
| | |____Detail                      详情页
| | |____List                        列表页
| | |____Login                       登陆页
| |____reducers                      存放reducers
| |____App.js                        根组件
| |____App.scss
| |____store                         
| | |____index.js                    store初始化逻辑
```

### store设计
按页面拆分成authReducer、eventReducer、detailReducer
```
|____reducers
| |____auth.js
| |____index.js
| |____channels.js
| |____details.js
| |____events.js
```
### 公共样式
1. 根据设计稿定义了全局的color变量
2. 可复用组件的样式

### color schema

> _color.scss

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
### font字体
SourceSansPro-Semibold
SourceSansPro-Bold
SourceSansPro-Regular

### 设计稿尺寸转换

按照设计稿尺寸修改**mixin.scss**中参数，等比例适配设备。

使用`p2w()`sass function

```scss
.content-wrapper {
  width: p2w(100px);
  padding: p2w(10px 16px);
}
```

### 阿里图表库

`//at.alicdn.com/t/font_1236043_fyxogxyfsav.css`
第一步：引入项目下面生成的 fontclass 代码：
`<link rel="stylesheet" href="./iconfont.css">`
第二步：挑选相应图标并获取类名，应用于页面：
`<span class="iconfont icon-xxx"></span>`

### 无限虚拟滚动

### i18n多国语言

### 项目截图