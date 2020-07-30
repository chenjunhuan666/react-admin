### `yarn start`  // 项目启动

### `yarn build`  // 项目打包

### `yarn eject`  // 暴露webpack配置，不可逆

### `yarn add sass-resources-loader -D` //  sass全局变量
```
{
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                },
                'sass-loader'
              ).concat({
                loader: "sass-resources-loader",
                options: {
                  resources:[
                    //  这里写你自己文件的位置
                    path.resolve(__dirname,'../src/assets/styles/main.scss')
                  ]
                }
              }),
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true,
            },
```

### `yarn add antd`  // 引入antd ui库
### `yarn add babel-plugin-import`
+ package.json中修改
```
"babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "import",
        {
          "libraryName": "antd",
          "style": "css"
        }
      ]
    ]
  },
```
### 跨域配置
1. 安装依赖
```
yarn add http-proxy-middleware
```
2. 新建文件
+ src/setupProxy.js
```
const proxy = require("http-proxy-middleware");
module.exports = function(app){
  app.use(proxy("/devApi",{
    target: "http://admintest.happymmall.com", //配置你要请求的服务器地址
    changeOrigin: true,
    pathRewrite: {   // 重写路径
        "^/devApi": "",
    }
  }))
  //app.use(proxy("/manage/api",{
    //target: "http://admintest.happymmall.com:7000", //配置你要请求的服务器地址
    //changeOrigin: true,
  //}))
}
```
3. 修改路径
+ 修改config/paths.js
+ proxySetup路径

### 环境变量
+ `process.env.NODE_ENV`读取变量
#### 项目打包配置环境变量
#### 依赖: `npm install -g dotenv-cli`
```
"build:dev": "dotenv -e .env.development react-app-rewired build",

"build:pro": "dotenv -e .env.production react-app-rewired build",

"build:test": "dotenv -e .env.test react-app-rewired build"
```

### 密码加密
```
yarn add crypto-js
import CryptoJs from 'crypto-js'
```
#### md5加密
```
const pwd = CryptoJs.MD5(password).toString()
```
#### SHA1
```
let pwd = CryptoJs.SHA1(password).toString()
```
#### AES加密 
```
第一个参数为需要加密的内容，第二个参数为秘钥const secretKey = "_zefdsuh123";
let pwd =CryptolS.AES.encrypt(password, secretKey).toSting();
```
### `yarn add react-cookies` 进行cookie的存储设置


