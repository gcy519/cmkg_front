<template>
  <div style="width: 100%;">

    <el-card style="margin-top: 20px;">
      <el-form :inline="true" :model="formInline" ref="formInline" :rules="rules">
        <el-form-item label="输入实体名：" prop="param1">
          <el-input v-model="formInline.param1" placeholder="哪吒"></el-input>
        </el-form-item>
        <el-form-item label="选择查询：" prop="param2">
          <el-select v-model="formInline.param2" placeholder="姜子牙">
            <el-option label="姜子牙" value="item1"></el-option>
            <el-option label="哪吒" value="item2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('formInline')">查询</el-button>
        </el-form-item>
      </el-form>

      <el-row>
        热门搜索：
        <el-button @click="onSubmit('哪吒')">哪吒</el-button>
        <el-button>姜子牙</el-button>
        <el-button>托塔天王</el-button>
      </el-row>
    </el-card>


    <el-row class="tac" style="margin-top: 20px;height:100%;">
<!--       <el-col :span="4">
    <h3 style="text-align: center;">热门搜索</h3>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-eleme"></i>
          <span>实体</span>
        </template>
        <el-submenu index="1-1">
          <template slot="title">教派1</template>
          <el-menu-item index="1-1-1">哪吒</el-menu-item>
          <el-menu-item index="1-1-2">姜子牙</el-menu-item>
        </el-submenu>
        <el-submenu index="1-2">
          <template slot="title">教派2</template>
          <el-menu-item index="1-2-1">元始天尊</el-menu-item>
          <el-menu-item index="1-2-2">姬昌</el-menu-item>
        </el-submenu>
        <el-menu-item-group>
          <template >分组三</template>
          <el-menu-item index="3-1">二郎神</el-menu-item>
          <el-menu-item index="3-2">雷震子</el-menu-item>
        </el-menu-item-group> 
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-info"></i>
          <span>关系</span>
        </template>
        <el-menu-item index="2-1">师徒</el-menu-item>
        <el-menu-item index="2-2">父子</el-menu-item>
        
      </el-submenu>
     <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item> 
    </el-menu>
  </el-col>
-->

    <el-col :span="20">
    <el-card >

    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="实体列表" name="list">
    
    
    <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%">
        <el-table-column label="日期">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal">
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
    
    </el-tab-pane>
    <el-tab-pane label="图谱" name="info">图谱 以及 实体信息<the-graph></the-graph></el-tab-pane>
  </el-tabs>

   </el-card>   
  </el-col>
   
</el-row>
  </div>
</template>

<script>
import { requestUserQuery } from '@/api/user'
import Graph from './forms/Graph'

export default {
  name: 'PageTable',
  components:{
    'the-graph': Graph
  },
  data () {
    return {
      input: '',
      activeName: 'list',
      formInline: {
        param1: '条件1',
        param2: '选项1'
      },
      tableData: [{
        date: '2016-05-03',

        name: '姜子牙',

        address: '道教'
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
      this.activeName = 'info'
      this.$refs[formName].validate((valid) => {
        
        if (valid) {
          requestUserQuery(this.formInline).then(res => {
            this.$message({
              message: '查询成功！',
              type: 'success'
            })
            this.pageTotal = res.data.length
            this.tableData = res.data
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleEdit (index, row) {
      this.form.index = index + (this.currentPage - 1) * this.pageSize
      this.form.name = row.name
      this.form.date = row.date
      this.form.address = row.address
      this.dialogFormVisible = true
    },
    handleDelete (index, row) {
      this.tableData.splice(index + (this.currentPage - 1) * this.pageSize, 1)
      this.pageTotal = this.tableData.length
      this.$message({
        message: '删除' + row.name + '成功！',
        type: 'success'
      })
    },
    handleSizeChange (size) {
      this.pagesize = size
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    },
    modifyUser () {
      this.tableData[this.form.index].name = this.form.name
      this.tableData[this.form.index].date = this.form.date
      this.tableData[this.form.index].address = this.form.address
      this.dialogFormVisible = false
      this.$message({
        message: '修改' + this.form.name + '成功！',
        type: 'success'
      })
    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }

</script>

<style scoped>
</style>
