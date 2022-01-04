<template>
  <el-dialog :visible.sync="isVisible" append-to-body :title="title" @close="cancel" :type="type"
             :close-on-click-modal="false" :close-on-press-escape="false" width="600px">
    <el-form :rules="rules" ref="refForm" :model="authRole" label-width="120px">

      <!--<el-row>
        <el-col :span="22">
          <el-form-item label="角色编码" prop="code">
            <el-input v-model="authRole.code" maxlength="100" placeholder="请输入角色编码" />
          </el-form-item>
        </el-col>
      </el-row>-->

      <el-row>
        <el-col :span="22">
          <el-form-item class="is-required" label="角色名称" prop="name">
            <el-input v-model="authRole.name" maxlength="100" placeholder="请输入角色名称"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
      <el-col :span="22">
        <el-form-item label="角色状态" prop="status">
          <!--<el-select
            class="wp-100"
            v-model="authRole.status"
            value-key="id"
            filterable
            placeholder="请选择角色状态"
            clearable>
            <el-option
              v-for="(item,index) in enums.accountState"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>-->
          <el-radio-group v-model="authRole.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      </el-row>

      <el-row>
        <el-col :span="22">
          <el-form-item label="角色说明" prop="describe">
            <el-input
              placeholder="请输入角色说明"
              v-model="authRole.describe"
              type="textarea"
              :autosize='{ minRows: 5, maxRows:5}'
              resize="none"
              maxlength="200"
              show-word-limit/>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <div slot="footer" class="dialog-footer" style="text-align:center">
      <el-button size="medium" @click="cancel">取消</el-button>
      <el-button size="medium" type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import constant from '@/utils/constant'
    import roleApi from "@/api/Role.js";
    import authRoleApi from '@/api/backstage/sysset/permission/user/AuthRole'

    export default {
        name: "AddAuthRole",

        components: {
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
                return this.type === "add" ? '新增角色' : '编辑角色';
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
            // 编码验证
            let validCode = async (rule, value, callback) => {
                if (value) {
                    await authRoleApi.validRoleCodeIsSingle(this.authRole).then(response => {
                        const res = response.data;
                        if (res.data) {
                            callback(new Error('该角色编码已存在'));
                        }
                    });
                }
                callback();
            };

            return {
                authRole: this.initAuthRole(),                         // 表单数据
                //visible: false,
                enums: {                                               // 常量枚举
                    accountState: constant.accountState
                },
                // 表单验证
                rules: {
                    /*'code':[{
                        required: false,
                        validator: validCode,
                        trigger: 'blur'
                    }],*/
                    'name':[{
                        required: true,
                        message: '请输入角色名称',
                        trigger: 'blur'
                    }],
                    'status':[{
                        required: true,
                        message: '请选择角色状态',
                        trigger: 'change'
                    }],
                },
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
            initAuthRole() {
                return {
                    id:'',
                    name:'',                // 名称
                    code:'',                // 编码
                    describe:'',            // 描述
                    status: 1,              // 角色状态
                    dsType: "ALL",          // 数据范围(默认全部)
                };
            },


            /**
             * 打开表单弹框
             * @Author: dfzhu
             * @Date: 2020/12/8
             */
            show(row) {
              if(row){
                this.authRole = {...row};
                if(row.status){
                    this.authRole.status = 1;
                }else{
                    this.authRole.status = 0;
                }
                  this.authRole.dsType = "ALL";
              }
            },


            /**
             * 表单取消
             * @Author: dfzhu
             * @Date: 2020/12/8
             */
            cancel(){
                this.$emit("close");
                this.$refs['refForm'].clearValidate();
                this.$refs['refForm'].resetFields();
                this.authRole = this.initAuthRole();
            },


            /**
             * 提交表单
             * @Author: dfzhu
             * @Date: 2020/12/8
             */
            submit () {
                this.$refs['refForm'].validate(valid => { // 表单验证
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
             * 新增角色
             * @Author: dfzhu
             * @Date: 2020/12/8
             */
            save(){
                roleApi.save(this.authRole).then(response => {
                    const res = response.data;
                    if (res.isSuccess) {
                        this.cancel();
                        this.$message.success("保存成功");
                        this.$emit('refresh')
                    }
                });
            },

            /**
             * 修改角色
             * @Author: dfzhu
             * @Date: 2020/12/8
             */
            update(){
                roleApi.update(this.authRole).then(response => {
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
