<template>
  <div>
      <el-row>
      <el-tabs v-model="activeName">
            <el-form :inline="true" :model="ruleForm"  ref="ruleForm" label-width="100px">
              <el-form-item label="输入问题：" prop="name">
                <el-input v-model="question" placeholder="问我教派的问题"></el-input>
                    </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              </el-form-item>              
<!-- 

      //   <el-form-item>
      //     <el-button type="primary" @click="onSubmit('formInline')">查询</el-button>
      //   </el-form-item>
      // </el-form>
              <el-form-item label="实体类别" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择实体类别">
                  <el-option label="人物" value="shanghai"></el-option>
                  <el-option label="教派" value="beijing"></el-option>
                </el-select>
              </el-form-item> -->

              <!-- <el-form-item label="查看大图" prop="resource">
                <el-radio-group v-model="ruleForm.resource">  
                  <el-radio label="是"></el-radio>
                  <el-radio label="否"></el-radio>
                </el-radio-group>
              </el-form-item> -->
             

              <!-- </el-form-item> -->
            </el-form>
      </el-tabs>
      </el-row>

    <el-card class="box-card">
    <div>
    <p>{{answer}}</p>
    </div>
  </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import {requestQA} from '@/api/user'

export default {
  name: 'PageFormsBase',
  data () {
    return {
      answer:'',
      activeName: 'first',
      question:'',
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入问题', trigger: 'blur' },
          { min: 2, max: 1000, message: '您可别乱输，我没那么智能', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
      var self = this
      requestQA(self.question).then(res => {
        self.answer = res.message
      })
      })
    },
  }
}
</script>

<style scoped>
</style>
