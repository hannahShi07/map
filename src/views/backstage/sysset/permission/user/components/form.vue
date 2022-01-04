<template>
  <el-dialog :visible.sync="isVisible" append-to-body :title="title" @close="cancel" :type="type"
             :close-on-click-modal="false" :close-on-press-escape="false" width="600px">
    <el-form :rules="rules" ref="refForm" :model="authUser" label-width="120px">
      <el-row>
        <el-col :span="22">
          <el-form-item class="is-required" label="所属组织" prop="djOrg.key">
            <el-input v-model="authUser.djOrg.data" placeholder="请选择所属组织" @click.native="getlistTree" class="wp-100"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="22">
          <el-form-item label="党员姓名" prop="member.key">
            <el-input v-model="authUser.member.data" placeholder="请选择党员姓名" @click.native="getSelectMember" class="wp-100"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="22">
          <el-form-item class="is-required" label="用户姓名" prop="name">
            <el-input v-model="authUser.name" maxlength="100" placeholder="请输入用户姓名"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="22">
          <el-form-item class="is-required" label="账号" prop="account">
            <el-input v-model="authUser.account" maxlength="100" placeholder="请输入账号"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="type === 'add'">
        <el-col :span="22">
          <el-form-item class="is-required" label="密码" prop="password">
            <el-input v-model="authUser.password"
               prefix-icon="el-icon-key"
               type="password"
               :show-password="true"
               :disabled="type === 'edit'"
               maxlength="100"
               onkeyup="this.value = this.value.replace(/\s+/g,'')"
               placeholder="请输入密码"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="type === 'add'">
        <el-col :span="22">
          <el-form-item class="is-required" label="确认密码" prop="confirmPassword">
            <el-input v-model="authUser.confirmPassword"
              type="password"
              :show-password="true"
              :disabled="type === 'edit'"
              maxlength="100"
              placeholder="请输入确认密码"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="22">
          <el-form-item class="is-required" label="手机号码" prop="mobile">
            <el-input v-model="authUser.mobile" maxlength="13" :placeholder="authUser.member.key !== '' ? '' : '请输入手机号码'" :disabled="authUser.member.key !== '' && authUser.member.key !== null"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="22">
          <el-form-item class="is-required" label="用户类型" prop="type.key">
            <el-select v-model="authUser.type.key"  placeholder="请选择用户类型" style="width: 393px" clearable >
              <el-option
                v-for="(item, index) in enums.userType"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-col :span="22">
        <el-form-item label="账号状态" prop="status">
          <!--<el-select
            class="wp-100"
            v-model="authUser.status"
            value-key="id"
            filterable
            placeholder="请选择账号状态"
            clearable>
            <el-option
              v-for="(item,index) in enums.accountState"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>-->
          <template>
            <el-radio-group v-model="authUser.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
      </el-col>

    </el-form>

    <div slot="footer" class="dialog-footer" style="text-align:center">
      <el-button size="medium" @click="cancel">取消</el-button>
      <el-button size="medium" type="primary" @click="submit">确定</el-button>
    </div>

    <!-- 所属组织弹窗 -->
    <tree-dialog ref="refTree" @refresh="getOrg"/>

    <!-- 关联党员弹框 -->
    <select-member ref="refSelectMember" @refresh="setMember" :isSingle="true"/>

  </el-dialog>
</template>

<script>
    import constant from '@/utils/constant'
    import TreeDialog from './SelectOrg'
    import authUserApi from '@/api/backstage/sysset/permission/user/AuthUser'
    import SelectMember from './SelectMember'

    export default {
        name: "AddAuthUser",

        components: {
            TreeDialog,            // 选择党组织弹框
            SelectMember           // 选择党员弹框
        },

        computed: {
            isVisible: {
                get() {
                    return this.dialogVisible;
                },
                set() {
                    this.cancel();
                }
            },
            title() {
                return this.type === "add" ? '新增账号' : '编辑账号';
            }
        },

        watch: {
            orgId(newValue, preValue) {
                if(preValue && newValue !== preValue){
                    this.authUser.member = {
                        key: '',
                        data: ''
                    };
                    this.selectMemberRow = [];
                }
            }
        },

        props: {
            dialogVisible: {
                type: Boolean,
                default: false
            },
            type: {               // add:新增, edit:修改
                type: String,
                default: "add"
            }
        },

        data () {
            // 账号验证
            let validAccount = async (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入账号'));
                } else {
                    await authUserApi.validUserMobileIsSingle({id: this.authUser.id, account: this.authUser.account, validaOpt: "account"}).then(response => {
                        const res = response.data;
                        if (res.data) {
                            callback(new Error('该账号已存在'));
                        }
                    });
                }
                callback();
            };

            // 密码验证
            let validPassword = (rule, value, callback) =>{
              /*if (!value) {
                  callback(new Error('请输入密码'));
              }else if (!(/(?!.*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/.test(value))) {
                  callback(new Error('请输入8-16位密码且需含有(数字、字母、其他符号)中至少两种'));
              }*/
              if (!value) {
                callback(new Error('请输入密码'));
              }else if (!(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()\[\]{}<>?\\+])[a-zA-Z0-9~!@#$%^&*()\[\]{}<>?\\+]{11,18}$/.test(value))) {
                callback(new Error('请输入11-18位密码且需含有(数字、字母、其他符号)'));
              }
                callback();
            };

            // 确认密码验证
            let validConfirmPassword = (rule, value, callback) =>{
                if (!value) {
                    callback(new Error('请输入确认密码'));
                }else{
                    if(value !== this.authUser.password){
                        callback(new Error('密码与确认密码不符'));
                    }
                }
                callback();
            };

            // 手机号码验证
            let validMobile = async (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入手机号码'));
                } else {
                    if (!(/^1([3456789])\d{9}$/.test(value))) {
                        callback(new Error('请输入正确的手机号码'));
                    }
                    await authUserApi.validUserMobileIsSingle({id: this.authUser.id, mobile: this.authUser.mobile, validaOpt: "mobile"}).then(response => {
                        const res = response.data;
                        if (res.data) {
                            callback(new Error('该手机号码已存在'));
                        }
                    });
                }
                callback();
            };
            return {
                orgId: '',
                authUser: this.initAuthUser(),                         // 表单数据
                enums: {                                               // 常量枚举
                    accountState: constant.accountState,
                    userType: constant.userType,
                },
                // 表单验证
                rules: {
                    'djOrg.key':[{
                        required: true,
                        message: '请选择所属组织',
                        trigger: 'change'
                    }],
                    'name':[{
                        required: true,
                        message: '请输入用户姓名',
                        trigger: 'blur'
                    }],
                    'account':[{
                        required: true,
                        validator: validAccount,
                        trigger: 'blur'
                    }],
                    'password':[{
                        required: true,
                        validator: validPassword,
                        trigger: 'blur'
                    }],
                    'mobile':[{
                        required: true,
                        validator: validMobile,
                        trigger: 'blur'
                    }],
                    'confirmPassword':[{
                        required: true,
                        validator: validConfirmPassword,
                        trigger: 'blur'
                    }],
                    'type.key':[{
                        required: true,
                        message: '请选择用户类型',
                        trigger: 'change'
                    }],
                    'status':[{
                        required: true,
                        message: '请选择角色状态',
                        trigger: 'change'
                    }],
                },

                selectMemberRow: [],
            }

        },

        mounted(){
        },

        methods: {
            /**
             * 初始化表单字段
             * @Author: dfzhu
             * @Date: 2020/12/8
             */
            initAuthUser() {
                return {
                    id:'',
                    djOrg: {                // 所属组织
                        data: '',
                        key: ''
                    },
                    member: {               // 关联党员
                        data: '',
                        key: ''
                    },
                    name:'',                // 姓名
                    mobile:'',              // 手机号码
                    account:'',             // 账号
                    password:'',            // 密码
                    confirmPassword:'',     // 确认密码
                    status: 1,              // 账号状态
                    type: {                 // 用户类型
                      data: '',
                      key: ''
                    },
                };
            },


            /**
             * 打开表单弹框
             * @Author: dfzhu
             * @Date: 2020/12/8
             */
            show(row) {
              if(row){
                  authUserApi.findUserById({id: row.id}).then(response => {
                      const res = response.data;
                      if (res.isSuccess) {
                          this.orgId = res.data.djOrg.key;
                          this.authUser = res.data;
                          /*this.authUser.password = "******";
                          this.authUser.confirmPassword = "******";*/
                          if(res.data.status){
                              this.authUser.status = 1;
                          }else{
                              this.authUser.status = 0;
                          }
                          this.selectMemberRow = [{id: res.data.member.key, name: res.data.member.data}]
                      }
                  });
              }
            },


            /**
             * 选择所属组织弹窗
             * @Author: dfzhu
             * @Date: 2020/12/8
             */
            getlistTree(){
                this.$refs['refTree'].show()
            },


            /**
             * 选择党员弹窗
             * @Author: dfzhu
             * @Date: 2020/12/16
             */
            getSelectMember(){
                this.$refs.refSelectMember.show(this.authUser.id, this.authUser.djOrg, this.selectMemberRow)
            },


            /**
             * 选择所属组织回调
             * @Author: dfzhu
             * @Date: 2020/12/8
             */
            getOrg(row){
                this.orgId = row.key;
                this.authUser.djOrg = row
            },


            /**
             * 选择党员后回显到表单
             * @Author: dfzhu
             * @Date: 2020/12/16
             */
            setMember(row){
                if(row && row.length > 0){
                    this.selectMemberRow = row;
                    this.authUser.member.key = row[0].id;
                    this.authUser.member.data = row[0].name;
                    this.authUser.mobile = row[0].phone;
                    this.$refs.refForm.validateField('mobile');

                    if(this.authUser.djOrg.key === ''){
                        this.authUser.djOrg = row[0].orgId;
                    }
                }else{
                    this.selectMemberRow = [];
                    this.authUser.member = {
                        key: '',
                        data: ''
                    };
                    this.authUser.mobile = '';
                }
            },


            /**
             * 表单取消
             * @Author: dfzhu
             * @Date: 2020/12/8
             */
            cancel(){
                this.$refs['refForm'].clearValidate();
                this.orgId = '';
                this.selectMemberRow = [];
                this.$refs['refForm'].resetFields();
                this.authUser = this.initAuthUser();
                this.$emit("close");
            },


            /**
             * 提交表单
             * @Author: dfzhu
             * @Date: 2020/12/8
             */
            submit () {
                // 表单验证
                this.$refs['refForm'].validate(valid => {
                    if (!valid) {
                        return;
                    }
                    if (this.type === "add") {
                        this.save();
                    } else {
                        this.update();
                    }
                })
            },


            /**
             * 新增账户
             * @Author: dfzhu
             * @Date: 2020/12/8
             */
            save(){
                authUserApi.save(this.authUser).then(response => {
                    const res = response.data;
                    if (res.isSuccess) {
                        this.cancel();
                        this.$message.success("保存成功");
                        this.$emit('refresh')
                    }
                });
            },

            /**
             * 修改账户
             * @Author: dfzhu
             * @Date: 2020/12/8
             */
            update(){
                authUserApi.update(this.authUser).then(response => {
                    const res = response.data;
                    if (res.isSuccess) {
                        this.cancel();
                        // this.$message.success("修改成功");
                        this.$message(this.successTip());
                        this.$emit('refresh')
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>
