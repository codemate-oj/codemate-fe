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
