#  飞书CLI 安装指南（学员版）

第一步：安装
bash
复制
```bash
npm install -g @larksuite/oapi-cli
```

第二步：初始化配置
bash
复制
```bash
lark-cli config init
```

按提示填入：
- App ID
- App Secret
- 默认语言：zh_cn
第三步：验证安装成功
bash
复制
```bash
lark-cli --version```

---

**🔑 认证方式（二选一）**

**方式A：OAuth登录（推荐学员）**
```bash
lark-cli auth login --type user
```



