# codemate-fe

基于NextJS构建，使用/支持技术栈：

- 基础框架
  - NextJS With App Router
  - React 18
- 样式方案
  - Tailwind CSS (Recommended)
  - CSS Module
- 组件库
  - shadcn/ui (Recommended)
  - ~~daisy-ui~~ (deprecated, use shadcn&tailwind instead)
  - Ant Design + ahooks
  - iconify/react: 按需加载、多来源图标组件
- 脚手架
  - EditorConfig
  - ESLint
  - Prettier
  - Husky & CommitLint & lint-staged
- 请求相关:
  - [alovajs](https://alova.js.org/zh-CN/tutorial/getting-started/)
  - openapi-typescript：使用OpenAPI文档自动生成dts类型声明
- 测试库
  - storybook

## 运行和开发项目

运行环境在`package.json`中有说明：

- Node >= 20
- pnpm@8.15.5（推荐使用corepack）

```bash
$ pnpm install
$ pnpm dev
```

### 环境变量说明

Next使用`dot-env`库读取环境变量，推荐使用`.env*.local`命名规范定义本地环境变量（不会被上传到git）。

```
# .env.local 会覆写 .env 中的环境变量，且不会添加到Git中，用于本地调试

# DISABLE_CACHE: 禁用alova的缓存功能
DISABLE_CACHE=true

# API_URL: 用于反向代理 /api，默认为线上链接，指向APIFox时可以使用其mock功能
API_URL=http://localhost:8888/

```

以下环境变量可能在编译时/运行时影响程序的行为（所有`process.env`环境变量都会被Next自动注入，前缀含有`NEXT_PUBLIC_*`的表示可以在运行时/浏览器环境中注入宏）：

- `BASE_URL`，影响API的baseUrl，默认为`/api`
- `L`，影响反向代理的目标值，默认为`https://www.aioj.net/`
- `DISABLE_CACHE`，当值为`true`时会禁用alova的缓存机制（但暂时不会禁用Next的缓存机制）
- `LOCAL_MOCK`，当值为`true`时会无视prod环境限制强制启用mock（基于alova）
- `NEXT_PUBLIC_APIFOX_TOKEN`，APIFOX云端Mock的鉴权Token

### 真实 API 说明

Next的Node服务在生产环境中将与[codemate-core(hydro)](https://github.com/codemateDao/codemate-core)在同一主机运行，通过Caddy将后端反代到`/api`这个route下。

因此，Alova中设置的baseUrl为`/api`，如果你的本地调试中想要修改这一行为，可以通过**环境变量**修改。

### 测试环境说明

我们有一个临时的测试服务器，用于提供后端环境，IP = http://42.193.125.14/

将`L`设置为`http://42.193.125.14/`即可。

### 本地 API 调试方法

#### 1. 用Docker本地部署codemate-core

感谢屈同学调试的Dockerfile，我们直接使用定义好的Docker Compose配置即可一键部署（如果网络顺畅，一般首次部署需要5~10分钟）

```bash
# this repo is public for AGPL License
$ git clone https://github.com/codemateDao/codemate-core.git
$ cd ./codemate-core
# ensure you've configured Docker & Docker Compose on your machine before running this
$ docker-compose up -d
# just enjoy a cup of tea ...

```

运行完成后，访问 http://localhost:8888 应该能看到Hydro的登录界面，该环境拥有**独立**的MongoDB数据库，**没有配备任何评测机**。

你可能需要通过CLI完成注册和超管设置：

```bash
# 进入Hydro实例的Docker Terminal
$ yarn hydrooj cli user create admin@hydro.local admin codemate123 2
$ yarn user setSuperAdmin 2
```

这样，你就注册了一个用户名为admin，密码为codemate123的超管账号了，后续你也应该使用同样的方法完成其他账户的注册。

#### 2. 使用next的rewrite功能将`/api`反向代理到本地服务上

这部分的配置已经提供在了`next.config.mjs`中，会在开发环境下将`/api`下的所有请求转发到8888端口上。

```javascript
{
  // ...
  rewrites: async () => {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api/:path*",
          destination: "http://localhost:8888/:path*",
        },
      ];
    }
    return [];
  };
}
```

#### 3. 数据mock

前后端分离架构难免具有一定的滞后性，当UI没有对应的后端API时，mock is all u need。

##### 接口未Ready时前端接口占位

我们团队使用APIFox描述API文档，可以使用其自带的本地或云端Mock功能，基于APIFox的智能Mock数据生成功能来填补数据。

> 如果你本地安装了APIFox，也可以使用本地Mock链接

APIFox云端Mock链接：https://mock.apifox.com/m1/4316065-3958911-default ；APIKey已写入环境文件（`.env`）中。

##### 本地自定义数据Mock

前端可能需要对特定数据或特定情况进行模拟和复现，这个时候就可以使用**基于请求库的本地mock功能**，其基于`alovajs-mock-adapter`，可以使用`mockjs`作为数据提供方。

本地Mock在DEV模式下默认开启，需要注意的是**使用`fetch()`或其他请求库发起请求无法调用项目中的mock数据**，必须使用项目中封装的`request`才能访问mock数据。

所有mock数据都存放在`src/mock`目录下，其中`index.ts`是adapter的配置，其他文件是不同scope的mock data slice，你可以简单地使用mock API来提供自定义Response和数据，也可以使用[mockjs](http://mockjs.com/)作为数据提供方。详见[alova-mock文档](https://alova.js.org/zh-CN/tutorial/request-adapter/alova-mock)。

## 目录结构与规范

> 注意：本项目内**目录和文件的命名规范是kebab-case**，即中间为短横线的分割方式

- `/src/components/ui/*` 是 shadcn 库自动添加的组件库，不要手动修改，也无需添加单测
  - 自己添加组件请根据作用域添加到 `/src/components/{scope}` 文件夹中，如：
    - 全局通用的组件就添加到 `common` 这个 scope 中
    - 其他的页面内复用的组件就放在对应页面的 scope 中，如 `nav`, `user-center` 等
- `/src/app/*` 是 NextJS 的 App Router 文件夹

## 前后端API同步

本项目后端使用APIFox描述API文档和进行自动化测试，前端开发可以阅读APIFox文档，并基于其导出的OpenAPI描述文件来生成类型声明文件。

### 更新类型声明

WIP：本项目通过Github Action自动更新类型声明，如果你发现滞后了，也可以手动更新。

1. 在APIFox中导出OpenAPI格式的描述文件
2. 在项目根目录运行 `npx openapi-typescript <your-openapi-file> -o src/types/schema.d.ts`
3. 工具会自动生成新的`schema.d.ts`，然后TS LSP会自动更新类型

## 最佳实践指南

### 页面篇

对于每个路由页面，最佳的方式是先用服务端组件作为父组件，子组件再用客户端组件。因为可能会有改浏览器标题之类的需求，这些在服务端组件中操作更加合适。用服务端组件的可拓展性更强。

### 请求篇：alova-hooks与业务封装

wip

## FAQ

> 脚手架有任何问题直接联系 @KiritoKing 即可。

### Q：我老是commit失败怎么办？

- 检查你的commit log是否满足[conventional commit](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum)规范
- 检查你的代码中是否含有ts和eslint错误，如果有也会被阻塞
- 如果你实在没有办法了，可以使用`--no-verify`来跳过commit时的类型和规范检查，但在PR的时候仍然会被阻塞，因此该方法**强烈不推荐**，你应该先解决代码中的问题

### Q：如何使用storybook框架来创建组件文档和测试？

参考文档：[Writing stories in Typescript](https://storybook.js.org/docs/writing-stories/typescript)

- 在`/src/stories`中新建`*.stories.ts`即可创建一个Story，具体格式可以参考`Button.stories.ts`和`PageTitle.stories.ts`
- 要求story描述中的namespace必须与组件的scope对应
- 要求所有common组件都要写story测试文件，其他随缘写，因为有storybook才能直观地看见有哪些组件可用，要怎么调用，以及各种边界渲染情况

### Q: 我在本地初始化好后端环境后所有请求都被403 Forbidden了怎么办？

> 这种情况下PostMan是可以正常工作的，如果PM不能正常工作应该与本问题无关。

这是由于Hydro的CSRF防护导致的，可以将本机的dev host加入到CORS白名单解决。

具体方法：

1. 以管理员身份访问 http://localhost:8888/manage/setting （Hydro系统管理页面）
2. 搜索 server.cors，找到跨域白名单
3. 将 localhost:3000 添加到里面，滑动到底部保存更改，在Docker中重启镜像

### Q：不是说强类型吗，为什么我的`request`得到的`data`都是`any`呢？

> 如果你深谙TS体操之道，你也可以看看源码直接通过加泛型参数来解决

为了鼓励前端对自己的数据来源负责（不信任后端数据），我们的类型加在了`transformData()`的源数据上，以鼓励开发每次调用请求时都手动处理数据。

在使用`transformData(rawData)`处理后，类型推断就会自动加上对应数据类型了。

### Q: 我在开发的时候发现首页有闪动是正常的吗？

由于Static Rendering在Dev时不会开启，这是Antd和Suspense结合的正常现象，线上不会有这个问题。

不信？你可以`build`然后`start`试试。
