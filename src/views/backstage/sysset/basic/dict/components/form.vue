<template>
  <el-dialog :visible.sync="isVisible" append-to-body :title="title" @close="cancel" :type="type"
             :close-on-click-modal="false" :close-on-press-escape="false" width="600px">
    <el-form :rules="rules" ref="refForm" :model="formData" label-width="120px">

      <el-row>
        <el-col :span="22">
          <el-form-item label="编码" prop="type">
            <el-input v-model="formData.type" maxlength="64" placeholder="请输入编码" class="wp-100"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="22">
          <el-form-item class="is-required" label="名称" prop="name">
            <el-input v-model="formData.name" maxlength="64" placeholder="请输入名称"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="typeId && typeId !== ''">
        <el-col :span="22">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="formData.sort" maxlength="3" placeholder="请输入排序" oninput="value=value.replace(/[^\d]/g,'')"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="22">
          <el-form-item label="描述" prop="describe">
            <el-input
              placeholder="请输入描述"
              v-model="formData.describe"
              type="textarea"
              :autosize='{ minRows: 9, maxRows:9}'
              resize="none"
              maxlength="200"
              show-word-limit/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-col :span="22">
        <el-form-item label="状态" prop="status">
          <template>
            <el-radio-group v-model="formData.status">
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

  </el-dialog>
</template>

<script>
    import constant from '@/utils/constant'
    import dictApi from '@/api/backstage/sysset/basic/dict/Dict'

    export default {
        name: "DictType",

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
                if(this.typeId && this.typeId !== ''){
                    return this.type === "add" ? '新增字典项' : '编辑字典项';
                }else{
                    return this.type === "add" ? '新增字典' : '编辑字典';
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
            },
            typeId: {               // dictType:数据字典, dict:数据字典项
                type: String,
                default: ""
            }
        },

        data () {
            return {
                orgId: '',
                formData: this.initFormData(),                         // 表单数据
                enums: {                                               // 常量枚举
                    accountState: constant.accountState
                },
                // 表单验证
                rules: {
                    'name':[{
                        required: true,
                        message: '请输入名称',
                        trigger: 'blur'
                    }],
                    'type':[{
                        required: true,
                        message: '请输入编码',
                        trigger: 'blur'
                    }],
                    'status':[{
                        required: true,
                        message: '请选择状态',
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
            initFormData() {
                return {
                    id:'',          // 主键
                    type:'',        // 编码
                    name:'',        // 名称
                    sort:'0',       // 排序
                    describe:'',    // 描述
                    status: 1,      // 状态
                    typeId: '',
                    code: '',
                };
            },


            /**
             * 打开表单弹框
             * @Author: dfzhu
             * @Date: 2020/12/8
             */
            show(row) {
              if(row){
                  this.formData = {...row};
                  this.formData.status = row.status ? 1 : 0;
                  /*this.formData = {
                      id: row.id,                   // 主键
                      type: row.type,               // 编码
                      name: row.name,               // 名称
                      describe: row.describe,       // 描述
                      status: row.status ? 1 : 0,   // 状态
                  }*/
              }
            },


            /**
             * 表单取消
             * @Author: dfzhu
             * @Date: 2020/12/8
             */
            cancel(){
                this.$refs['refForm'].clearValidate();
                this.$refs['refForm'].resetFields();
                this.formData = this.initFormData();
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
             * 新增
             * @Author: dfzhu
             * @Date: 2020/12/8
             */
            save(){
                if(this.typeId && this.typeId !== ''){
                    this.formData.typeId = this.typeId;
                    this.formData.code = this.formData.type;
                    if(this.formData.sort === ''){
                        this.formData.sort = 0;
                    }
                    dictApi.saveDict(this.formData).then(response => {
                        const res = response.data;
                        if (res.isSuccess) {
                            this.cancel();
                            this.$message.success("保存成功");
                            this.$emit('refresh')
                        }
                    });
                }else {
                    dictApi.save(this.formData).then(response => {
                        const res = response.data;
                        if (res.isSuccess) {
                            this.cancel();
                            this.$message.success("保存成功");
                            this.$emit('refresh')
                        }
                    });
                }
            },

            /**
             * 修改
             * @Author: dfzhu
             * @Date: 2020/12/8
             */
            update(){
                if(this.typeId && this.typeId !== ''){
                    this.formData.typeId = this.typeId;
                    if(this.formData.sort === ''){
                        this.formData.sort = 0;
                    }
                    dictApi.editDict(this.formData).then(response => {
                        const res = response.data;
                        if (res.isSuccess) {
                            this.cancel();
                            // this.$message.success("修改成功");
                            this.$message(this.successTip());
                            this.$emit('refresh')
                        }
                    });
                }else {
                    dictApi.update(this.formData).then(response => {
                        const res = response.data;
                        if (res.isSuccess) {
                            this.cancel();
                            // this.$message.success("修改成功");
                            this.$message(this.successTip());
                            this.$emit('refresh')
                        }
                    });
                }
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>
