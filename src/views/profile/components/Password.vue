<template>
  <el-form :model="p" :rules="rules" class="form" label-position="right" label-width="80px" ref="form">
    <el-form-item :label="$t('table.user.oldPassword')" prop="oldPassword">
<!--      <el-input type="password" v-model="p.oldPassword" />-->
      <el-input  :type="types" v-model="p.oldPassword" @focus="inputChange"/>
    </el-form-item>
    <el-form-item :label="$t('table.user.newPassword')" prop="password">
<!--      <el-input type="password" v-model="p.password" />-->
      <el-input  :type="types" v-model="p.password" @focus="inputChange"/>
    </el-form-item>
    <el-form-item :label="$t('table.user.confirmPassword')" prop="confirmPassword">
<!--      <el-input type="password" v-model="p.confirmPassword" />-->
        <el-input  :type="types" v-model="p.confirmPassword" @focus="inputChange"/>
    </el-form-item>
    <el-form-item style="text-align: center;">
      <el-button @click="submit" type="primary" >{{ $t('common.edit') }}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import userApi from '@/api/User.js'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {

        }
      }
    }
  },
  data () {
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
              if(value !== this.p.password){
                  callback(new Error('密码与确认密码不符'));
              }
          }
          callback();
      };
    return {
        types:'text',
      p: {
        oldPassword: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: this.$t('rules.require'), trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validPassword,  trigger: 'blur' },
        ],
        confirmPassword: [
          { required: true, message: this.$t('rules.require'), trigger: 'blur' },
          {            validator: (rule, value, callback) => {
              if (this.p.password !== value) {
                callback(this.$t('tips.notEqual'))
              } else {
                callback()
              }
            }, trigger: 'blur'          }
        ]
      }
    }
  },
  mounted(){
        this.p.oldPassword='',
        this.p.password= '',
        this.p.confirmPassword=''
  },
  methods: {
      inputChange(){
          this.types = "password"
      },
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          userApi.updatePassword({
            ...this.p,
            ...{ id: this.user.id }
          }).then((response) => {
            const res = response.data
            if (res.isSuccess) {
              this.$message({
                message: this.$t('tips.updateSuccess'),
                type: 'success'
              })
              this.$refs.form.clearValidate()
              this.$refs.form.resetFields()
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
