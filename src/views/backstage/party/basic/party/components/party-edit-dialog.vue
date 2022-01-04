<template>
  <el-dialog :title="addStatus ? '新建党组织' : '编辑党组织'" :visible.sync="visible" width="887px">

    <el-form ref="refForm" :model="formData" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="上级党组织">
            <el-select v-model="formData.name" placeholder="请选择" class="wp-100">
              <el-option label="1" value="">默认</el-option>
              <!--          <el-option-->
              <!--            v-for="item in options"-->
              <!--            :key="item.value"-->
              <!--            :label="item.label"-->
              <!--            :value="item.value">-->
              <!--          </el-option>-->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组织类别">
            <el-select v-model="formData.name" placeholder="请选择" class="wp-100">
              <el-option label="1" value="">默认</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="组织名称">
        <el-input placeholder="请输入"/>
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item label="组织编码">
            <el-input placeholder="请输入"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组织类型">
            <el-select v-model="formData.name" placeholder="请选择" class="wp-100">
              <el-option label="1" value="">默认</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="联系方式">
            <el-input placeholder="请输入"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组织分类">
            <el-select v-model="formData.name" placeholder="请选择" class="wp-100">
              <el-option label="1" value="">默认</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="组织地址" class="rel">
        <el-cascader v-model="formData.name" :options="cityData" style="width: 372px"/>
        <el-input placeholder="请输入" style="width: 314px"/>
        <img class="ml-10 pointer" src="@/assets/page/icon-map.png" width="23" height="21" alt="">
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item label="批准建立党组织日期">
            <div class="form-big-label" slot="label">批准建立党组织日期</div>
            <el-select v-model="formData.name" placeholder="请选择" class="wp-100">
              <el-option label="1" value="">默认</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="批准建立党组织文号">
            <div class="form-big-label" slot="label">批准建立党组织文号</div>
            <el-input placeholder="请输入"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="组织图片" class="rel">
      </el-form-item>

      <el-form-item label="组织简介" class="rel">
        <el-input placeholder="请输入" type="textarea" :rows="5" maxlength="500" show-word-limit/>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="visible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

  export default {
    data () {
      return {
        // 模态
        visible: false,
        // 是否为添加
        addStatus: true,
        formData: {
          name: '',
          region: ''
        },
        cityData: [],
        imageUrl: ''
      }
    },
    methods: {
      // t:  1-新增
      show (t, row) {
        this.addStatus = t === 1
        this.visible = true
      },

    }
  }
</script>

<style scoped>
  .form-big-label {
    padding-left: 10px;
    line-height: 20px;
  }
</style>
