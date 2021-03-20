const tokens = {
  admin: {
    token: "admin-token"
  },
  editor: {
    token: "editor-token"
  }
};

const users = {
  "admin-token": {
    name: "admin",
    intr: "管理员",
    avatar: "",
    roles: ["admin"]
  },
  "editor-token": {
    name: "editor",
    intr: "用户",
    avatar: "",
    roles: ["editor"]
  }
};

export default [
  {
    url: "/user/login",
    type: "post",
    response: config => {
      const { userName } = config.body;
      const token = tokens[userName];
      // login error
      if (!token) {
        return {
          code: 401,
          message: "账号密码错误"
        };
      }

      return {
        code: 200,
        data: token
      };
    }
  },
  {
    url: "/user/info",
    type: "get",
    response: config => {
      const query = config.query
      let response = null
      Object.keys(users).forEach(key => {
        if (key === query.token) response = users[key]
      })
      if (response) {
        return {
          code: 200,
          data: response
        }
      }

      return {
        code: 404,
        message: "未查询到数据"
      }
    }
  }
];
