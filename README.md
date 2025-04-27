# log-my-bills

一个个人记账微信小程序.

---

## Getting Started

### 安装开发环境

```bash
git clone https://github.com/rffYu/log-my-bills.git
cd log-my-bills
npm install
```

使Taro编译器能够找到assets文件: 在src下创建assets目录的软链接.

```bash
ln -s assets/ src/assets
```

而不是修改`src/app.config.ts`文件中的`iconPath: assets/...`, 因为微信和Taro有不同的目录结构.

---

### 开发(H5预览)
```bash
npm run inject:mock <json-data-file>
npm run dev:h5
```

---

## 编译微信小程序包

```bash
npm run build:weapp
rsync -a dist/ <wechat-project-folder>/
rsync -a assets/ <wechat-project-folder>/assets/
```

然后在微信开发者工具中打开 <wechat-project-folder>，
**并在右上角「详情 → 本地设置」中开启选项：**

> ✅ 将 JS 编译成 ES5

