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