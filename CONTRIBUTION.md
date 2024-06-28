# 贡献指南

感谢您对CODEMATE（AIOJ）的关注!我们欢迎并感激任何形式的贡献。本指南旨在为您提供参与本项目的基本信息。

## 如何贡献

有多种方式可以为本项目做出贡献:

1. 报告 Bug
2. 提出新功能建议
3. 提交代码修复或新功能

## 报告 Bug

如果您发现了 bug，请通过 GitHub Issues 向我们报告。在创建新的 issue 之前，请先搜索现有的 issues，以确保不会重复报告。

创建 bug 报告时，请包含以下信息:

- 清晰简洁的标题
- 重现步骤
- 预期行为
- 实际行为
- 您的运行环境(操作系统、软件版本等)

## 提出新功能建议

我们欢迎新的想法和建议。请通过 GitHub Issues 提交您的建议，并详细描述该功能的使用场景和潜在好处。

## 改进文档

文档对于项目的可用性至关重要。如果您发现文档中有任何错误或不清晰的地方，欢迎提交修改。

## 提交代码

1. Fork 本仓库（如果您是本项目的工作人员请忽略这一步）
2. 根据命名规范，创建您的特性分支 (如`git checkout -b feat/xiaoming/enhance-utils`)
   1. 第一个字段表示该分支的用途，是新特性（feat）还是修复（fix）
   2. 第二个字段表示该分支的维护者，**请勿与他人共用分支**，也尽量**不要在多个PR中共用一个分支**
   3. 第三个字段表示当前分支的内容概括，如你要添加什么功能，多个单词之间使用`-`分割（kebab-case）
3. 提交您的更改，并遵守conventional commit规范 (如`git commit -m 'feat: 完成xx功能'`)，项目脚手架会自动在commit时检查代码质量和commit message
4. 将您的更改推送到分支 (`git push feat/xiaoming/enhance-utils`)
5. 提交 Pull Request，并按照规范填写PR信息
   1. 标题第一个字段表示该PR是特性还是修复，第二个字段描述需求/缺陷名，**请勿直接使用默认名称**！
   2. 内容需要至少包含以下内容
      1. 代码改动覆盖了哪些功能
      2. 如何复现和测试代码功能

### 代码风格

请遵循项目现有的代码风格。我们使用 eslint 和 prettier 来保持一致性，使用 storybook 作为开发文档和自动化测试工具。

- 文件名遵循kebab-case规范，但是组件名遵循PascalCase规范
- 普通变量使用camelCase规范（小驼峰），常量和枚举使用全大写+下划线连接
- Hook文件使用camelCase规范
- **请勿擅自更新项目的任何依赖**

### 提交信息规范

请遵循以下提交信息格式:

```
<类型>: <描述>

[可选的正文]

[可选的脚注]
```

类型可以是: feat, fix, docs, style, refactor, test, chore 等。

## 行为准则

请参阅我们的[行为准则](CODE_OF_CONDUCT.md)，了解我们对项目参与者的期望。

## 许可证

通过为本项目做出贡献，您同意您的贡献将根据项目的 [许可证名称] 进行许可。

再次感谢您的贡献!如果您有任何问题，请随时与我们联系。

我可以为您提供更多关于这个贡献指南模板的信息或解释吗？