# my_midway_project

## 快速入门

<!-- 在此次添加使用文档 -->

如需进一步了解，参见 [midway 文档][midway]。

### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
```

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。


[midway]: https://midwayjs.org



常用的登录实现方案：

基于Session/Cookie的登录：用户在输入用户名和密码后，服务器会验证用户的身份，并将用户信息存储在Session或Cookie中。在随后的请求中，服务器会检查相应的Session或Cookie来验证用户身份。
Token-Based登录：用户在输入用户名和密码后，服务器会颁发一个加密的Token给客户端，并把token对应的用户信息存到redis中，客户端需要在随后的请求中将Token添加到请求头中，服务器会从redis中检查Token是否存在以验证用户身份。
JWT（JSON Web Token）登录：JWT是一种基于Token的身份验证方案，它使用JSON格式来传输信息，并对其进行签名以保证安全性，后续不需要做服务器验证。

上面方案中我们首先把Session/Cookie排除掉，下面我们从token+redis和jwt方案中选一个。


先看一下JWT方案的优点：

去中心化，便于分布式系统使用
基本信息可以直接放在token中。 username，nickname，role...
功能权限较少的话，可以直接放在token中。用bit位表示用户所具有的功能权限

在我看来，JWT某些优点，对于后台管理系统的登录方案可能是缺点。做过后端管理系统的人应该知道，用户信息或权限可能会经常变更，如果使用JWT方案在用户权限变更后，没办法使已颁发的token失效，有的人说服务器存一个黑名单可以解决这个问题，这种其实就是有状态了，就不是去中心化了，那就失去了使用JWT的意义了，所以我们这个后台管理系统登录实现方案使用token+redis方案。个人觉得JWT适用论坛以及一些用户一旦注册后，信息就不会再变更的系统。

