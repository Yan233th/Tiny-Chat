# Tiny-Chat

## 上海电力大学咨询助手

轻量级聊天应用，基于 Next.js、pnpm 和 Tailwind CSS 构建，支持 AI 提供商（如 Dify）集成，实现实时对话。

---

## 🚀 特性

* **轻量级**：快速启动和构建，适合小型部署。
* **AI 集成**：支持与 Dify API 对接，实现智能聊天。
* **响应式设计**：Tailwind CSS + tw-animate-css 动画支持。
* **现代开发体验**：TypeScript + ESLint + Dev Container 支持。

---

## 🛠 技术栈

* **前端框架**：Next.js 15
* **包管理器**：pnpm
* **样式框架**：Tailwind CSS
* **类型检查**：TypeScript
* **代码质量工具**：ESLint
* **动画支持**：tw-animate-css
* **AI 提供商**：Dify（可替换）

---

## 📁 项目目录概览

```
.app                # 页面和 API 路由
.components         # 自定义 UI 组件
.lib                # 工具函数
.public             # 静态资源
.Dockerfile         # Docker 部署配置
.devcontainer       # VSCode Dev Container 配置
```

---

## ⚙️ 环境变量

在开发或 Docker 生产环境中，需要配置以下环境变量：

```env
DIFY_API_KEY=your_api_key
DIFY_BASE_URL=http://<YOUR_SERVER_IP>/v1
```

* Next.js 会自动把 `.env.local` 加载到 `process.env`。
* Docker 部署时，可通过 `-e` 选项将环境变量传递给容器，或者使用 docker-compose 的 `environment` 配置。

---

## 💻 开发

### 使用 Dev Container

如果使用 VSCode Dev Container：

1. 打开 VSCode，选择 **Reopen in Container**
2. 容器内已经安装 Node.js、pnpm 等工具

### 本地运行

```bash
pnpm install
pnpm dev
```

浏览器访问 `http://localhost:3000` 查看效果。

---

## 🐳 Docker 部署

### 构建镜像

```bash
docker build -t tiny-chat:latest .
```

### 运行容器

```bash
docker run -d \
  -e DIFY_API_KEY=your_api_key \
  -e DIFY_BASE_URL=http://<YOUR_SERVER_IP>/v1 \
  --name tiny-chat \
  tiny-chat:latest
```

> 说明：
>
> * `-d` 表示后台运行
> * `-e` 用于传入环境变量
> * `--name` 给容器命名
> * 最后指定镜像名和标签

> 多阶段构建已优化，生产镜像仅包含 `.next` 构建产物和生产依赖。

---

## 🛠 构建生产环境

```bash
pnpm build
pnpm start
```

* `.next/` 是生产产物目录
* `pnpm start` 启动生产服务器

---

## 📄 许可证

本项目采用 **AGPL-3.0** 许可证，详见 LICENSE 文件。
