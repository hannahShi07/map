<template>
  <div class="login-container">
    <div class="cloud-left"></div>
    <div class="cloud-right"></div>
    <div class="cloud-content"></div>
    <div class="login-background"></div>
    <div class="login-box">
      <div class="login-left">
        <img src="../../assets/page/login-left.png" />
      </div>
      <el-form
        :model="loginForm"
        :rules="rules"
        autocomplete="off"
        class="login-form"
        label-position="left"
        ref="loginForm"
      >
        <div class="title-container">
          <h3 class="title">欢迎回来！</h3>
        </div>
        <span v-if="login.type === 'up'">
          <!-- <el-form-item prop="tenant" v-show="isMultiTenant">
            <el-input
              :placeholder="$t('login.tenant')"
              @keyup.enter.native="handleLogin"
              autocomplete="off"
              name="tenantView"
              prefix-icon="el-icon-user"
              ref="tenant"
              type="text"
              v-model="loginForm.tenantView"
            />
          </el-form-item> -->
          <el-form-item prop="account">
            <el-input
              :placeholder="$t('login.username')"
              @keyup.enter.native="handleLogin"
              autocomplete="off"
              name="account"
              prefix-icon="el-icon-user"
              ref="account"
              type="text"
              v-model="loginForm.account"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :placeholder="$t('login.password')"
              :show-password="true"
              @keyup.enter.native="handleLogin"
              autocomplete="off"
              name="password"
              prefix-icon="el-icon-key"
              ref="password"
              type="password"
              v-model="loginForm.password"
            />
          </el-form-item>
          <el-form-item class="code-input" prop="code" v-show="isCaptcha">
            <el-input
              :placeholder="$t('login.code')"
              @keyup.enter.native="handleLogin"
              autocomplete="off"
              name="code"
              prefix-icon="el-icon-lock"
              ref="code"
              style="width: 70%"
              type="text"
              v-model="loginForm.code"
            />
          </el-form-item>
          <img
            v-show="isCaptcha"
            :src="imageCode"
            @click="getCodeImage"
            alt="codeImage"
            class="code-image"
          />
          <el-button
            :loading="loading"
            @click.native.prevent="handleLogin"
            style="width:100%;margin-bottom:14px;"
            type="primary"
          >{{ $t("login.logIn") }}</el-button
          >
        </span>
        <span v-if="login.type === 'social'">
          {{ $t("login.chooseToSignIn") }}
          <div>
            <template v-for="(l, index) in logo">
              <div :key="index" class="logo-wrapper">
                <img
                  :class="{ radius: l.radius }"
                  :src="resolveLogo(l.img)"
                  @click="socialLogin(l.name)"
                  alt
                />
              </div>
            </template>
          </div>
        </span>
        <span style="margin-top: -1rem" v-if="login.type === 'bind'">
          <el-tabs @tab-click="handleTabClick" v-model="tabActiveName">
            <el-tab-pane :label="$t('common.bindLogin')" name="bindLogin">
              <el-form-item prop="bindAccount">
                <el-input
                  :placeholder="$t('login.account')"
                  autocomplete="off"
                  name="bindAccount"
                  prefix-icon="el-icon-user"
                  ref="bindAccount"
                  type="text"
                  v-model="loginForm.bindAccount"
                />
              </el-form-item>
              <el-form-item prop="bindPassword">
                <el-input
                  :placeholder="$t('login.password')"
                  :show-password="true"
                  autocomplete="off"
                  name="bindPassword"
                  prefix-icon="el-icon-key"
                  ref="bindPassword"
                  type="password"
                  v-model="loginForm.bindPassword"
                />
              </el-form-item>
              <el-button
                :loading="loading"
                @click.native.prevent="bindLogin"
                style="width:100%;margin-bottom:14px;"
                type="primary"
              >{{ $t("common.bindLogin") }}</el-button
              >
            </el-tab-pane>
            <el-tab-pane :label="$t('common.signLogin')" name="signLogin">
              <el-form-item prop="signAccount">
                <el-input
                  :placeholder="$t('login.account')"
                  autocomplete="off"
                  name="signAccount"
                  prefix-icon="el-icon-user"
                  ref="signAccount"
                  type="text"
                  v-model="loginForm.signAccount"
                />
              </el-form-item>
              <el-form-item prop="signPassword">
                <el-input
                  :placeholder="$t('login.password')"
                  :show-password="true"
                  autocomplete="off"
                  name="signPassword"
                  prefix-icon="el-icon-key"
                  ref="signPassword"
                  type="password"
                  v-model="loginForm.signPassword"
                />
              </el-form-item>
              <el-button
                :loading="loading"
                @click.native.prevent="signLogin"
                style="width:100%;margin-bottom:14px;"
                type="primary"
              >{{ $t("common.signLogin") }}</el-button
              >
            </el-tab-pane>
          </el-tabs>
        </span>
        <el-checkbox class="remember" v-model="remember">记住密码</el-checkbox>
        <el-dropdown class="login-type" placement="top-end">
          <span class="el-dropdown-link">
            <el-link type="primary">{{ $t("login.ortherLoginType") }}</el-link>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              :disabled="login.type === 'up'"
              @click.native="login.type = 'up'"
            >{{ $t("login.type.up") }}
            </el-dropdown-item
            >
            <el-dropdown-item
              :disabled="login.type === 'social'"
              @click.native="login.type = 'social'"
            >{{ $t("login.type.social") }}
            </el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-form>
    </div>
  </div>
</template>

<script>
  import db from "@/utils/localstorage";
  import menuHandler from "@/views/login/components/index";
  import store from '@/store/index'
  import {randomNum} from "@/utils";
  import {socialLoginUrl} from "@/settings";
  import loginApi from "@/api/Login.js";
  import {page} from "@/api/Login.js";
  import {Base64} from 'js-base64';
  import Cookies from "js-cookie";
  import { encrypt, decrypt } from '@/utils/jsencrypt'
  import JsEncrypt from 'encryptlong'

  export default {
    name: "Login",
    data () {
      return {
        //是否启用多租户
        isMultiTenant:
          process.env.VUE_APP_IS_MULTI_TENANT === "true" ? true : false,
        isCaptcha:
          process.env.VUE_APP_IS_CAPTCHA === "true" ? true : false,
        tabActiveName: "bindLogin",
        login: {
          type: "up"
        },
        logo: [
          {img: "gitee.png", name: "gitee", radius: true},
          {img: "github.png", name: "github", radius: true},
          {img: "tencent_cloud.png", name: "tencent_cloud", radius: true},
          {img: "qq.png", name: "qq", radius: false},
          {img: "dingtalk.png", name: "dingtalk", radius: true},
          {img: "microsoft.png", name: "microsoft", radius: false}
        ],
        loginForm: {
          account: "",
          password: "",
          tenantView: "dev", //显示用的
          tenant: "", //传递给后端的
          key: randomNum(24, 16),
          code: "",
          grantType: process.env.VUE_APP_IS_CAPTCHA === "true" ? "captcha" : "password",
          bindAccount: "",
          bindPassword: "",
          signAccount: "",
          signPassword: ""
        },
        remember:false,
        rules: {
          account: {
            required: true,
            message: this.$t("rules.require"),
            trigger: "blur"
          },
          tenantView: {
            required: true,
            message: this.$t("rules.require"),
            trigger: "blur"
          },
          password: {
            required: true,
            message: this.$t("rules.require"),
            trigger: "blur"
          },
          code: {
            validator: (rule, value, callback) => {
              if (this.isCaptcha && value === '') {
                callback('验证码不能为空')
              } else {
                callback()
              }
              callback()
            }, trigger: 'blur'
          },
          bindAccount: {
            required: true,
            message: this.$t("rules.require"),
            trigger: "blur"
          },
          bindPassword: {
            required: true,
            message: this.$t("rules.require"),
            trigger: "blur"
          },
          signAccount: [
            {
              required: true,
              message: this.$t("rules.require"),
              trigger: "blur"
            },
            {
              min: 4,
              max: 10,
              message: this.$t("rules.range4to10"),
              trigger: "blur"
            }
          ],
          signPassword: [
            {
              required: true,
              message: this.$t("rules.require"),
              trigger: "blur"
            },
            {
              min: 6,
              max: 20,
              message: this.$t("rules.range6to20"),
              trigger: "blur"
            }
          ]
        },
        authUser: null,
        loading: false,
        showDialog: false,
        redirect: undefined,
        otherQuery: {},
        imageCode: "",
        page: {
          width: window.screen.width * 0.5,
          height: window.screen.height * 0.5
        },
        defFrontPath: '',
        defLaterPath: '',
        publicKey: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDFdvIEByVLryQ4LI4i/N0qjXlq\n" +
          "8XN9P6JUC4S9+/rN1uFjtK/BBcdO351Yhxcvx7og/U833iXAWHJgNGtoSQCWsJUx\n" +
          "EJyrshH3AH4G1xKesFoHAQQ7oi93nXWuOOTXK1NdSOzKfF5dY8Dx9qktYm/v61M9\n" +
          "bfNpcGr9s2Hhxe9GBQIDAQAB",
        privateKey: "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMV28gQHJUuvJDgs\n" +
          "jiL83SqNeWrxc30/olQLhL37+s3W4WO0r8EFx07fnViHFy/HuiD9TzfeJcBYcmA0\n" +
          "a2hJAJawlTEQnKuyEfcAfgbXEp6wWgcBBDuiL3edda445NcrU11I7Mp8Xl1jwPH2\n" +
          "qS1ib+/rUz1t82lwav2zYeHF70YFAgMBAAECgYEArWicdn8T+JgRFafDFuS7ERB2\n" +
          "rTzm7/n/AxGue+0aPsPS4W2e3sLFWfW0RzczXIloYmoxtF1JB9Zkcyn1nPpnIWKS\n" +
          "pxhfP3KMxJ0VmqTJf41A32NAkq8sQ0kiH7swjHHPA/rlONGMpOnfJk+/y+b0Dwq6\n" +
          "rOmKKr0Y/qTRCzP3Fa0CQQDw2NF9vAQ4VlIqwtilBb5TyT70poAPhO4psEDz+0tj\n" +
          "QW/QKpZJBeT+XqZxcYFi5Fgcwj6ki+VTPK3u8FhGyDnzAkEA0eNksFzAdzgHcwgq\n" +
          "GyIYvxjvIy40j8i3Dnt3AS9GkWIkA681G+b1NOm7zJKvekyIXTel/Sckbiei3Nez\n" +
          "S5JGJwJBAJsAz4J+OLERTPxcPhWmpqFByZSme5CBWs3Vs1fSiOguOwnb/rCsbH4Q\n" +
          "6EnmZQECOHr5wFsh9csmKEK4x/d18WUCQGWBkr2UbeR6bWfdh/eNWuh4l5atDvCG\n" +
          "wrk3Tst84KUJEJ/TiVzQKsCHVbLPMhx0jPKAKj+vQXggpSwnCWg/+rsCQEjHXwpH\n" +
          "O9x6TLbV/YSYsOuKKBFTJSuumD6BdwU28iYrfmUn0ASxUr0G5PyO0bga9TtH728G\n" +
          "GWoUahs6ZnUsHXk="
      };
    },
    created () {
      this.getCookie();
    },
    mounted () {
      db.clear();
      this.getCodeImage();
    },
    destroyed () {
      window.removeEventListener("message", this.resolveSocialLogin);
    },
    methods: {
      getCodeImage () {
        loginApi
          .getCaptcha(this.loginForm.key)
          .then(response => {
            const res = response.data;
            if (res.byteLength <= 100) {
              this.$message({
                message: this.$t("tips.systemError"),
                type: "error"
              });
            }
            return (
              "data:image/png;base64," +
              btoa(
                new Uint8Array(res).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              )
            );
          })
          .then(res => {
            this.imageCode = res;
          })
          .catch(e => {
            if (e.toString().indexOf("429") !== -1) {
              this.$message({
                message: this.$t("tips.tooManyRequest"),
                type: "error"
              });
            } else {
              this.$message({
                message: this.$t("tips.getCodeImageFailed"),
                type: "error"
              });
            }
          });
      },
      //获取账号密码
      getCookie() {
        const username = Cookies.get("username");
        const password = Cookies.get("password");
        const remember = Cookies.get('remember');
        this.loginForm.account = username === undefined ? this.loginForm.account : username;
        this.loginForm.password = password === undefined ? this.loginForm.password : decrypt(password);
        this.remember = remember === undefined ? false : Boolean(remember);
          // password: password === undefined ? this.loginForm.password : decrypt(password),
      },
      handleTabClick (tab) {
        this.tabActiveName = tab.name;
      },
      resolveLogo (logo) {
        return require(`@/assets/logo/${logo}`);
      },
      socialLogin (oauthType) {
        const url = `${socialLoginUrl}/${oauthType}/login`;
        window.open(
          url,
          "newWindow",
          `resizable=yes, height=${this.page.height}, width=${this.page.width}, top=10%, left=10%, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no`
        );
        window.addEventListener("message", this.resolveSocialLogin, false);
      },
      resolveSocialLogin (e) {
        const data = e.data;
        const that = this;
        if (data.message === "not_bind") {
          that.login.type = "bind";
          const authUser = data.data;
          that.authUser = authUser;
          that
            .$confirm(
              that.$t("common.current") +
              authUser.source +
              that.$t("common.socialAccount") +
              authUser.nickname +
              that.$t("common.socialTips"),
              that.$t("common.tips"),
              {
                confirmButtonText: that.$t("common.signLogin"),
                cancelButtonText: that.$t("common.bindLogin"),
                type: "warning"
              }
            )
            .then(() => {
              that.tabActiveName = "signLogin";
            })
            .catch(() => {
              that.tabActiveName = "bindLogin";
            });
        } else if (data.message === "social_login_success") {
          that.saveLoginData(data.data);
          that.getUserDetailInfo();
          that.loginSuccessCallback(data.account);
        } else {
          // do nothing
        }
      },
      bindLogin () {
        let account_c = false;
        let password_c = false;
        this.$refs.loginForm.validateField("bindAccount", e => {
          if (!e) {
            account_c = true;
          }
        });
        this.$refs.loginForm.validateField("bindPassword", e => {
          if (!e) {
            password_c = true;
          }
        });
        if (account_c && password_c) {
          this.loading = true;
          const that = this;
          const params = {
            bindAccount: that.loginForm.bindAccount,
            bindPassword: that.loginForm.bindPassword,
            ...that.authUser
          };
          params.token = null;
          that
            .$post("auth/social/bind/login", params)
            .then(r => {
              const data = r.data.data;
              this.saveLoginData(data);
              this.getUserDetailInfo();
              this.loginSuccessCallback(that.loginForm.bindAccount);
            })
            .catch(error => {
              console.error(error);
              that.loading = false;
            });
        }
      },
      signLogin () {
        let account_c = false;
        let password_c = false;
        this.$refs.loginForm.validateField("signAccount", e => {
          if (!e) {
            account_c = true;
          }
        });
        this.$refs.loginForm.validateField("signPassword", e => {
          if (!e) {
            password_c = true;
          }
        });
        if (account_c && password_c) {
          this.loading = true;
          const that = this;
          const params = {
            bindAccount: that.loginForm.signAccount,
            bindPassword: that.loginForm.signPassword,
            ...that.authUser
          };
          params.token = null;
          that
            .$post("auth/social/sign/login", params)
            .then(r => {
              const data = r.data.data;
              this.saveLoginData(data);
              this.getUserDetailInfo();
              this.loginSuccessCallback(that.loginForm.signAccount);
            })
            .catch(error => {
              console.error(error);
              that.loading = false;
            });
        }
      },
      handleLogin () {
        this.loginForm.tenant = `${Base64.encode(this.loginForm.tenantView)}`;
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loginSubmit();
          } else {
            return false
          }
        })
      },
      loginSubmit () {
        this.loading = true;
        const that = this;
        if (that.remember == true) {
          Cookies.set("username", that.loginForm.account, { expires: 30 });
          Cookies.set("password", that.loginForm.password, { expires: 30 });
          Cookies.set('remember', that.remember, { expires: 30 });
        } else {
          Cookies.remove("username");
          Cookies.remove("password");
          Cookies.remove('remember');
        }
        this.$store.commit("account/setTenant", this.loginForm.tenant);
        //登录账号和密码rsa加密
        let rsaTxt = {
          account:this.loginForm.account,
          password:this.loginForm.password
        }
        let RSA = new JsEncrypt();
        RSA.setPublicKey(this.publicKey);
        this.loginForm.rsa = RSA.encryptLong(JSON.stringify(rsaTxt));
        // console.log('加密: '+JSON.stringify(this.loginForm.rsa))
        // RSA.setPrivateKey(this.privateKey)
        // let decryptTXT=RSA.decryptLong(this.loginForm.rsa);
        // decryptTXT=JSON.parse(decryptTXT)
        // console.log('解密: '+JSON.stringify(decryptTXT))

        delete this.loginForm.account;
        delete this.loginForm.password;

        loginApi.login(this.loginForm).then(response => {
          const res = response.data;
          if (res.isSuccess) {
            that.saveLoginData(res.data['token'], res.data['refreshToken'], res.data['expiration']);
            let resUser = res.data;
            if(res.extra && res.extra.djOrg){
                resUser.djOrg = res.extra.djOrg;
            }else{
                resUser.djOrg = {};
            }
            that.saveUserInfo(resUser);
            that.getResource();
          } else {
            that.getCodeImage();
          }
        }).catch(() => {
          // if(error.response.data){
          //   this.$message({
          //     message: error.response.data.msg,
          //     type: "error"
          //   });
          // }
          that.getCodeImage();
        })
          .finally(() => that.loading = false);
      },
      saveLoginData (token, refreshToken, expiration) {
        this.$store.commit("account/setToken", token);
        this.$store.commit("account/setRefreshToken", refreshToken);
        this.$store.commit("account/setExpireTime", expiration);
      },
      saveUserInfo (user) {
        this.$store.commit("account/setUser", {
          id: user.userId,
          account: user.account,
          name: user.name,
          avatar: user.avatar,
          workDescribe: user.workDescribe,
          djOrg: user.djOrg
        });
      },
      getResource () {
        loginApi.getResource().then(response => {
          const res = response.data;
          if (res.isSuccess) {
            const permissionsList = res.data;
            this.$store.commit("account/setPermissions", permissionsList ? permissionsList : []);

            this.loginSuccess();
          } else {
            this.getCodeImage();
          }
        });
      },


      // 登陆成功
      loginSuccess () {
        this.$message({
          message: this.$t("tips.loginSuccess"),
          type: "success"
        });

        // 设置菜单
        loginApi.getRouters({}).then((response) => {
          const res = response.data
          let routers = res.data;

          // 获取后台默认跳转地址
          this.getLaterDefPath(routers);
          // 初始化面包屑父级菜单
          menuHandler.initBreadcrumbParent(routers);

          if(routers && routers.length > 0){
            routers.childMenu = [];
            db.save('USER_ROUTES_CHILD', routers[0].children);
          }
          // 登录用户菜单存入缓存
          store.commit('account/setRoutes', routers)

          // 判断是否有后台菜单 => 是: 跳转后台排序第一个菜单。否：跳转至404页面
          if(this.defLaterPath && this.defLaterPath !== ''){
            this.$router.push(this.defLaterPath);
          }else {
            this.$router.push("/error-page/404");
          }
        })

      },


      loginSuccessCallback (user) {
        // console.log(user);
      },


      /**
       * 获取后台第一个有效菜单path
       * @Date: 2021/2/26
       */
      getLaterDefPath (list) {
          if(list){
              let vm = this;
              for (let i = 0; i < list.length; i++) {
                  let obj = list[i];
                  if(vm.defLaterPath === ''){
                      // 菜单为页面组件时获取path
                      if(obj.component && obj.component !== "Layout"){
                          vm.defLaterPath = obj.path;

                      // 菜单不是页面组件时继续在子节点寻找
                      }else {
                          if(obj.children){
                              vm.getLaterDefPath(obj.children);
                          }
                      }
                  }else {
                      return false;
                  }

              }
          }
      },

    }
  };
</script>

<style lang="scss">
  $bg: #283443;
  $light_gray: #fff;
  $cursor: #555;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    min-height: 782px;
    min-width: 730px;
    .el-input {
      display: inline-block;

      input {
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        border-radius: 0;
        color: #000000;
        height: 28px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid #dedede;
      border-radius: 2px;
      color: #454545;
      transition: all 0.3s;

      &:hover {
        border-color: #57a3f3;
      }
    }
  }
</style>
<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #aaa;
  $light_gray: #eee;

  .login-container {
    background: url(../../assets/page/cloud-background.png) 100% no-repeat;
    background-position:center;
    // background-color: #2d3a4b;
    background-size: cover;
    width: 100%;
    height: 100vh;
    overflow: hidden;

    .cloud-left{
      width:1176px;
      height:621px;
      position: relative;
      top:386px;
      left: 0;
      background: url(../../assets/page/cloud-left.png) 100% no-repeat;
      background-position:center;
    }

    .cloud-right{
      position: absolute;
      top:0;
      right: 0;
      width:856px;
      height:384px;
      background: url(../../assets/page/cloud-content.png) 100% no-repeat;
      background-position:center;
    }

    .cloud-content{
      position: absolute;
      top:160px;
      right: 0;
      width:960px;
      height:621px;
      background: url(../../assets/page/cloud-right.png) 100% no-repeat;
      background-position:center;
    }

    .login-background{
      position: absolute;
      top: 0;
      left: 0;
      width:945px;
      height:405px;
      background: url(../../assets/page/login-background.png) 100% no-repeat;
    }

    .login-info {
      position: absolute;
      left: 15%;
      top: 44%;
      margin-top: -100px;
      color: #fff;

      .title {
        font-size: 1.8rem;
        font-weight: 600;
      }

      .sub-title {
        font-size: 1.5rem;
        margin: 0.3rem 0 0.7rem 1rem;
      }

      .desc {
        font-size: 0.96rem;
        line-height: 1.9rem;
      }
    }

    .login-box{
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -183px 0 0 -355px;
      width: 710px;
      height: 366px;
      background-color:#fff;
      border-radius: 8px;

      .login-left{
        float: left;
        width: 50%;
        height: 100%;
        border-radius: 8px;
        opacity: 0.8;
        position: relative;

        img{
          float: left;
          width: 100%;
          height: 100%;
        }

        .left-bottom{
          position: absolute;
          left: 43px;
          bottom:40px;
          width:259px;
          color:#fff;
          text-align: justify;
          text-align-last: justify;
          div{
            font-size:24px;
            line-height:31px;
            font-weight:bold;
          }

          span{
            display: block;
            font-size:9px;
            line-height:12px;
            margin-top:7px;
            text-align:justify;
            text-justify:inter-ideograph;
          }
        }
      }

      .login-form {
        float: left;
        width: 50%;
        height: 100%;
        padding: 30px 47px;
        border-radius: 3px;

        .el-form-item{
          height:38px;
          // width:260px;
          width:100%;
          border-radius:19px;
        }

        .code-input {
          width: 50%;
          display: inline-block;
          vertical-align: middle;
        }

        .code-image {
          display: inline-block;
          vertical-align: top;
          cursor: pointer;
        }

        .login-type {
          text-align: right;
          display: inline-block;
          width: 100%;
          display: none;
        }

        .logo-wrapper {
          display: inline-block;
          margin: 10px 0;

          img {
            width: 1.9rem;
            display: inline-block;
            margin: 0.8rem 0.8rem -0.8rem 0.8rem;
            cursor: pointer;

            &.radius {
              border-radius: 50%;
            }
          }
        }

        .remember{
          position: absolute;
          bottom:30px;
          right: 47px;
        }
      }
    }

    .login-footer {
      position: fixed;
      bottom: 1rem;
      width: 100%;
      text-align: center;
      color: white;
      font-size: 0.85rem;
      line-height: 1rem;
      height: 1rem;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .title-container {
      position: relative;

      .title {
        font-size: 22px;
        color: #666666;
        margin: 0 auto 28px auto;
        text-align: center;
        font-weight: bold;
        line-height:29px;
      }

      .set-language {
        color: #aaa;
        position: absolute;
        top: 3px;
        font-size: 18px;
        right: 0;
        cursor: pointer;
      }
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }

    @media screen and (max-width: 1100px) {
      .login-info {
        left: 8%;
      }
    }

    @media screen and (max-width: 970px) {
      .login-form {
        left: 50%;
      }
      .login-info {
        display: none;
      }
    }
  }
  .login-form >>> .el-form-item__content{
    line-height:36px;
  }
  .login-form >>> .el-input__inner{
    height:36px;
    width:198px;
    margin-left:30px;
    padding-left:10px;
    border-radius:0;
  }
  .login-form >>> .el-input__prefix{
    left:10px;
  }
  .login-form >>> .el-input__icon::before{
    padding-right:5px;
    border-right:1px solid #999999;
  }
  .login-form >>> .el-input__clear::before{
    padding-right:5px;
    border-right:none;
  }
  .login-container >>> .el-input input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #fff inset !important;
    box-shadow: 0 0 0 1000px #fff inset !important;
  }
  .code-input >>> .el-input__inner{
    width:100%;
  }
</style>
