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
  - daisy-ui
  - Ant Design
- 脚手架
  - EditorConfig
  - ESLint
  - Prettier
  - Husky & CommitLint & lint-staged
- 请求库: [alovajs](https://alova.js.org/zh-CN/tutorial/getting-started/)
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

以下环境变量可能在编译时/运行时影响程序的行为（所有`process.env`环境变量都会被Next自动注入）：

- `BASE_URL`，影响API的baseUrl，默认为`/api`
- `DISABLE_CACHE`，当值为`true`时会禁用alova的缓存机制（但暂时不会禁用Next的缓存机制）
- `NEED_MOCK`，当值为`true`时会无视prod环境限制强制启用mock（基于alova）

### 真实 API 说明

Next的Node服务在生产环境中将与[codemate-core(hydro)](https://github.com/codemateDao/codemate-core)在同一主机运行，通过Caddy将后端反代到`/api`这个route下。

因此，Alova中设置的baseUrl为`/api`，如果你的本地调试中想要修改这一行为，可以通过**环境变量**修改。

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

前后端分离架构难免具有一定的滞后性，当UI没有对应的后端API时，mock is all u need

接口Mock在DEV模式下默认开启，其基于alova的接口Adapter，因此**使用`fetch()`或其他请求库发起请求无法调用项目中的mock数据**。

所有mock数据都存放在`src/mock`目录下，其中`index.ts`是adapter的配置，其他文件是不同scope的mock data slice，你可以简单地使用mock API来提供自定义Response和数据，也可以使用[mockjs](http://mockjs.com/)作为数据提供方。详见[alova-mock文档](https://alova.js.org/zh-CN/tutorial/request-adapter/alova-mock)。

## 目录结构与规范

> 注意：本项目内**目录和文件的命名规范是kebab-case**，即中间为短横线的分割方式

- `/src/components/ui/*` 是 shadcn 库自动添加的组件库，不要手动修改，也无需添加单测
  - 自己添加组件请根据作用域添加到 `/src/components/{scope}` 文件夹中，如：
    - 全局通用的组件就添加到 `common` 这个 scope 中
    - 其他的页面内复用的组件就放在对应页面的 scope 中，如 `nav`, `user-center` 等
- `/src/app/*` 是 NextJS 的 App Router 文件夹

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
