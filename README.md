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
  - Ant Design
- 脚手架
  - EditorConfig
  - ESLint
  - Prettier
  - Husky & CommitLint & lint-staged

## 运行项目

运行环境在`package.json`中有说明：

- Node >= 20
- pnpm@8.15.5（推荐使用corepack）

```bash
$ pnpm install
$ pnpm dev
```

## 项目架构

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
