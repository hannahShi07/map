<template>
  <div class="base-table-empty" v-if="equipment===1">
    <el-form-item :label="name" :prop="phone" :rules="[{ required: isImport, message: '请输入'+name, trigger: 'blur' },{ pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '请输入正确的'+name }]">
      <el-input maxlength="11" clearable v-model="telephone" :placeholder="'请输入'+name" oninput="value = value.replace(/[^\d]/g, '')" @change="change" @blur="blurInput" @focus="focusInput"/>
    </el-form-item>
  </div>
  <div class="base-table-empty-small" v-else-if="equipment===2">
    <el-form-item :label="name" :prop="phone" :rules="[{ required: isImport, message: '请输入'+name, trigger: 'blur' },{ pattern: /(\d{3,4}-)?[0-9]{7,8}/, message: '请输入正确的'+name }]">
      <el-input maxlength="13" clearable v-model="telephone" :placeholder="'请输入'+name" oninput="value = value.replace(/[^\d-]/g, '')" @change="change" @blur="blurInput" @focus="focusInput"/>
    </el-form-item>
  </div>
  <div class="base-table-empty-small-s" v-else>
    <el-form-item :label="name" :prop="phone" :rules="[{ required: isImport, message: '请输入'+name, trigger: 'blur' },{ pattern: /^(((\d{3,4}-)?[0-9]{7,8})|(1(3|4|5|6|7|8|9)\d{9}))$/, message: '请输入正确的'+name }]">
      <el-input maxlength="13" clearable v-model="telephone" :placeholder="'请输入'+name" oninput="value = value.replace(/[^\d-]/g, '')" @change="change" @blur="blurInput" @focus="focusInput"/>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    name: 'BaseTelephone',
    props:{
      equipment : { // 1: 手机; 2: 座机; 3: 座机和手机
        type: Number,
        default: 3
      },
      name : {
        type: String,
        default: "联系方式"
      },
      isImport:{//是否必填
        type: Boolean,
        default: false
      },
      phone:{//绑定prop
        type: String,
        default: "phone"
      },
      value: {
        type: String,
        default: '',
        request: true
      }
    },
    data(){
      return{
        telephone:""
      }
    },
    methods: {
      change (phone) {
        this.$emit('input', phone)
      },
      blurInput(){
        this.$emit('blurInput')
      },
      focusInput(){
        this.$emit('focusInput')
      }
    },
    watch:{
      value :{
        handler (newName) {
          this.telephone = newName
        },
        immediate: true
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
