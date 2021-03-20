<template>
  <div class="login-container">
    <div
      class="left-wrap"
      :style="{
        background: `#FAFAFF url(${leftBackgroundUrl}) no-repeat center/contain `,
      }"
    ></div>
    <div class="right-wrap">
      <div class="login-form">
        <h3>系统登录</h3>
        <el-form
          :model="userForm"
          :rules="rules"
          ref="userForm"
          class="login-userForm"
        >
          <!-- account -->
          <el-form-item prop="account">
            <el-input
              type="text"
              v-model="userForm.account"
              autocomplete="off"
              clearable
              placeholder="admin or editor"
            >
              <!-- slot前置图标 -->
              <template #prefix>
                <svg-icon
                  icon-name="account-fill"
                  icon-class="svg-login-input"
                />
              </template>
            </el-input>
          </el-form-item>
          <!-- password -->
          <el-form-item prop="password">
            <el-input
              type="text"
              v-model="userForm.password"
              autocomplete="off"
              placeholder="随意输入"
              v-if="showPassword"
            >
              <!-- slot前置图标 -->
              <template #prefix>
                <svg-icon
                  icon-name="unlock-fill"
                  icon-class="svg-login-input"
                />
              </template>
              <!-- 后置图标 -->
              <template #suffix>
                <svg-icon
                  icon-name="icon-test1"
                  icon-class="svg-login-input pointer"
                  @click.native="handlerShowPassword"
                />
              </template>
            </el-input>
            <el-input
              type="password"
              v-model="userForm.password"
              autocomplete="off"
              placeholder="随意输入"
              v-else
            >
              <!-- slot前置图标 -->
              <template #prefix>
                <svg-icon
                  icon-name="unlock-fill"
                  icon-class="svg-login-input"
                />
              </template>
              <!-- 后置图标 -->
              <template #suffix>
                <svg-icon
                  icon-name="icon-test"
                  icon-class="svg-login-input pointer"
                  @click.native="handlerShowPassword"
                />
              </template>
            </el-input>
          </el-form-item>
          <!-- 验证码 -->
          <!-- <el-form-item class="code-field" prop="verificationCode">
            <el-input v-model="userForm.verificationCode" clearable> </el-input>
            <div class="randomCode">1</div>
          </el-form-item> -->
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              @click="submitForm('userForm')"
              >登录</el-button
            >
            <div class="other-login">
              <p class="pointer" @click="otherHandler">忘记密码？</p>
              <div
                class="pointer"
                v-for="data in loginMethods"
                :key="data.id"
                @click="otherHandler"
              >
                <svg-icon :icon-name="data.icon" icon-class="svg-login-other" />
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// import { captcha } from "src/mock/index.js";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("user");
export default {
  components: {},
  data() {
    const validateAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    // const validateCode = (rule, value, callback) => {
    //   if (value !== this.verificationCode || value === "") {
    //     callback(new Error("验证码错误"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      // 左侧背景
      leftBackgroundUrl: require("assets/img/login_bg.png"),
      // 验证码
      verificationCode: "",
      // 随机验证码
      randomCode: "",
      // 登录方式
      loginMethods: [
        { id: "wx", icon: "icon-test80" },
        { id: "alipay", icon: "alipay" },
        { id: "github", icon: "icon-test77" },
      ],

      // button loading
      loading: false,

      // 表单数据
      userForm: {
        account: "",
        password: "",
        // verificationCode: ""
      },
      // 验证规则
      rules: {
        account: [{ validator: validateAccount, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        // verificationCode: [{ validator: validateCode, trigger: "blur" }]
      },
      showPassword: false,
    };
  },

  methods: {
    ...mapActions(["login"]),
    // login
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.login(this.userForm).then(
            (result) => {
              this.$router.push({ path: "/" });
              this.loading = false;
            },
            (error) => {
              this.loading = false;
            }
          );
        } else {
          this.loading = false;
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 其他自定义事件
    otherHandler() {
      this.$message({
        type: "warning",
        duration: 3000,
        message: "暂无功能",
      });
    },
    handlerShowPassword() {
      console.log(123);
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $deepBlue;
  display: flex;

  .left-wrap {
    flex: 0 0 520px;
    height: 100%;
  }

  .right-wrap {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-form {
      max-width: 440px;
      width: 100%;
      height: 550px;
      background: #fff;
      box-shadow: $box-shadow-black;
      padding: 30px;
      box-sizing: border-box;
      background: #1c2541;
      color: #fff;
      h3 {
        font-size: 26px;
        font-weight: 700;
        text-align: center;
      }
    }
  }
}

// icon
.svg-login-input {
  width: 20px;
  height: 20px;
  color: $deepBlue;
}

.svg-login-other {
  width: 40px;
  height: 40px;
  color: #eee;
}

@media screen and (max-width: 1000px) {
  .left-wrap {
    display: none;
  }
}
</style>

<style lang="scss" scoped>
// element-ui
$heightInp: 40px;
$colorInp: #eee;
::v-deep .el-button {
  display: block;
  width: 100%;
  padding: 0;
  margin: 0;
  height: $heightInp;
  margin: 20px 0;
  font-size: 16px;
}

::v-deep .el-input {
  height: $heightInp;
  .el-input__inner {
    height: 100%;
    font-size: 16px;
    line-height: $heightInp;
    background: $colorInp;

    &:focus {
      border: none;
    }
  }

  .el-input__prefix {
    display: flex;
    align-items: center;
  }
  .el-input__suffix {
    display: flex;
    align-items: center;
    .el-input__suffix-inner {
      display: flex;
      align-items: center;
    }
  }

  .el-input__icon {
    line-height: $heightInp;
    color: $deepBlue;
    font-size: 16px;
  }
}

::v-deep .code-field .el-form-item__content {
  display: flex;

  .el-input {
    margin-right: 20px;
  }

  .randomCode {
    max-width: 120px;
    width: 100%;
    height: $heightInp;
    border-radius: 4px;
    background: #eee;
  }
}

::v-deep .other-login {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  text-align: right;
  margin-top: -10px;
  padding: 0 10px;
  color: #ccc;
  margin-top: 20px;

  p {
    margin: 0 auto 0 0;
    padding: 0;

    &:hover {
      color: #fff;
    }
  }

  div {
    background: #ddd;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;

    &:hover {
      background: #fff;
    }
  }
}
</style>
