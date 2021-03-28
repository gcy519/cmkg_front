<template>
  <div style="width: 100%;">
    <!-- <el-card style="margin-top: 20px;"> -->
      <el-form :inline="true" :model="formInline" ref="formInline" :rules="rules">
        <el-form-item label="搜索实体：" prop="param1">
          <el-input v-model="formInline.param1" placeholder=""></el-input>
        </el-form-item>
        <!-- <el-form-item label="选择查询：" prop="param2">
          <el-select v-model="formInline.param2" placeholder="姜子牙">
            <el-option label="姜子牙" value="item1"></el-option>
            <el-option label="哪吒" value="item2"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit('formInline')">查询</el-button>
        </el-form-item>
      </el-form>
    <!-- </el-card> -->
    <el-card style="margin-top: 20px;">

    
      <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%">

        <el-table-column label="姓名" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="日期">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>

      </el-table>
      <!--页码显示-->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
      
      <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="名字" label-width="120px">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" label-width="120px">
            <el-input v-model="form.date" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="出生地点" label-width="120px">
            <el-input v-model="form.address" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="modifyUser()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { requestUserQuery } from '@/api/user'

export default {
  name: 'PageTable',
  data () {
    return {
      formInline: {
        param1: '哪吒',
      },
      tableData: [{
        date: '2016-05-03',

        name: '王小虎',

        address: '上海市普陀区金沙江路 1518 弄'
      }],
      rules: {
        param1: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        param2: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      currentPage: 1,
      pageSize: 10,
      pageTotal: 0,
      dialogFormVisible: false,
      form: {
        name: '',
        date: '',
        address: '',
        index: 0
      }
    }
  },
  methods: {
    onSubmit (formName) {
      // this.$refs[formName].validate((valid) => {
        // if (valid) {
          requestUserQuery(this.formInline).then(res => {
            this.$message({
              message: '查询成功！',
              type: 'success'
            })
            this.pageTotal = res.data.length
            this.tableData = res.data
            console.log('/api/user/query')
          })
        // } else {
        //   console.log('error submit!!')
        //   return false
        // }
      // })
    }
  }
}
</script>

<style scoped>
</style>
