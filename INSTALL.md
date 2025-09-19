# 🏠 Discovery Homes - 本地安装指南

## 📋 系统要求

- **Node.js**: 版本 16.0 或更高
- **npm**: 版本 8.0 或更高（通常随Node.js一起安装）
- **Git**: 用于克隆代码仓库
- **现代浏览器**: Chrome、Firefox、Safari、Edge等

## 🚀 快速开始

### 1. 检查环境

首先确认您的系统环境：

```bash
# 检查Node.js版本
node --version

# 检查npm版本
npm --version

# 检查Git版本
git --version
```

如果没有安装Node.js，请访问 [nodejs.org](https://nodejs.org) 下载安装。

### 2. 克隆项目

```bash
# 使用HTTPS克隆
git clone https://github.com/pj950/discoveryhome.git

# 或使用SSH克隆（如果配置了SSH密钥）
git clone git@github.com:pj950/discoveryhome.git

# 进入项目目录
cd discoveryhome
```

### 3. 安装依赖

```bash
# 安装所有项目依赖
npm install

# 或者使用yarn（如果您偏好yarn）
yarn install
```

**依赖安装包括：**
- React 19 - 前端框架
- TypeScript - 类型支持
- React Router DOM - 路由管理
- Recharts - 图表组件
- Tailwind CSS - 样式框架
- Vite - 构建工具

### 4. 启动开发服务器

```bash
# 启动开发服务器
npm run dev

# 或使用yarn
yarn dev
```

服务器启动后，您会看到类似以下输出：

```
  VITE v6.2.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### 5. 访问应用

打开浏览器访问：

- **前端首页**: http://localhost:5173/
- **后台管理**: http://localhost:5173/#/admin

## 📁 项目结构

```
discoveryhome/
├── components/          # 可复用组件
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PropertyCard.tsx
│   └── StatsChart.tsx
├── pages/              # 页面组件
│   ├── HomePage.tsx
│   ├── AdminPage.tsx
│   ├── DashboardPage.tsx
│   ├── MessagesPage.tsx
│   ├── ReportsPage.tsx
│   └── SettingsPage.tsx
├── services/           # 服务层
│   └── geminiService.ts
├── App.tsx            # 主应用组件
├── types.ts           # TypeScript类型定义
├── constants.ts       # 常量和模拟数据
├── index.css          # 全局样式
├── index.html         # HTML模板
├── package.json       # 项目配置
├── vite.config.ts     # Vite配置
└── vercel.json        # Vercel部署配置
```

## 🎯 功能特性

### 前端功能
- ✅ 房源展示（瀑布流布局）
- ✅ 房源详情弹窗
- ✅ 预订表单
- ✅ 响应式设计

### 后台管理
- ✅ **Dashboard**: 数据统计仪表盘
- ✅ **Properties**: 房源管理（增删改查）
- ✅ **Messages**: 客户消息管理
- ✅ **Reports**: 数据报告和分析
- ✅ **Settings**: 系统设置

### 数据可视化
- 📊 月度预订趋势图
- 📈 收入分析图表
- 🥧 房型分布饼图
- 📋 详细统计表格

## 🛠 开发命令

```bash
# 开发模式启动
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 类型检查
npx tsc --noEmit
```

## 🔧 常见问题

### Q: 端口被占用怎么办？

如果5173端口被占用，Vite会自动使用下一个可用端口。您也可以手动指定端口：

```bash
npm run dev -- --port 3000
```

### Q: 依赖安装失败

尝试清除缓存后重新安装：

```bash
# 删除node_modules和锁文件
rm -rf node_modules package-lock.json

# 清除npm缓存
npm cache clean --force

# 重新安装
npm install
```

### Q: 构建失败

确保所有依赖都正确安装，并检查TypeScript类型错误：

```bash
# 检查类型错误
npx tsc --noEmit

# 强制构建（忽略警告）
npm run build -- --force
```

### Q: 图片不显示

项目使用了在线图片资源，确保网络连接正常。如果需要使用本地图片，请将图片放在 `public/` 目录下。

## 🌐 部署

### Vercel部署
```bash
# 安装Vercel CLI
npm install -g vercel

# 登录并部署
vercel --prod
```

### 其他平台
项目支持部署到任何静态网站托管平台：
- Netlify
- GitHub Pages
- Firebase Hosting
- AWS S3

## 📞 技术支持

如果遇到问题，请：

1. 检查Node.js和npm版本是否符合要求
2. 确保网络连接正常
3. 查看浏览器控制台错误信息
4. 参考项目的GitHub Issues

## 📝 开发注意事项

- 项目使用TypeScript，请确保类型正确
- 使用Tailwind CSS进行样式开发
- 模拟数据在 `constants.ts` 中定义
- 所有图表使用Recharts组件

Happy Coding! 🎉