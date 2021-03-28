<template>
  <div style="width: 100%">
  <el-card>
      <div class="div-tab">
        <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
          
          <!-- 实体搜索框 -->
          <el-tab-pane label="实体">
          <el-row>  
              <el-col  span=5>
                <el-input v-model="entityQuery" placeholder="请输入实体名"></el-input>
              </el-col>
          </el-row>
          <br/>
          </el-tab-pane>
          
          <!-- 关系搜索框 -->
          <el-tab-pane label="关系">
            <el-row>
                <el-form :model="relationQuery" ref="relationQuery" label-width="35px" class="" size="large">
                
                  <el-col span=8>
                      <el-form-item label="">
                          <el-input v-model="relationQuery[0]" placeholder="请输入实体名"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col span=8>
                      <el-form-item label="与">
                          <el-input v-model="relationQuery[1]" placeholder="请输入实体名"></el-input>
                      </el-form-item>
                  </el-col>
              </el-form>
          </el-row>
          </el-tab-pane>

          <!-- 问答搜索框 -->
          <el-tab-pane label="问答">
            <el-row>
              <el-col span=20>
                <el-input v-model="questionQuery" placeholder="请输入问题"></el-input>
              </el-col>
            </el-row>
            <br/>
          </el-tab-pane>

          <!--key很关键，踩坑了-->
          <el-row>
                热门搜索：
                <el-button size="mini" @click="PopularSearch(item)"
                  v-for="(item,index) in hotItems"
                  v-bind:key="index"
                  :value="item">
                {{item}}
                </el-button>
          </el-row>
          <br/>
      </el-tabs>
    </div>

    <div class="div-search">
            <el-button type="primary" @click="onSearchBtn" icon="el-icon-search">查询</el-button>
    </div>
  
    
    <div class="div-result">
      <el-card>
      <p>{{result}}</p>
      </el-card>
    </div>
  </el-card>
  </div>
</template>

<script>
import { requestHotSearch,requestRelation,getEntity,requestQA } from '@/api/user'
import PageFormsBase from './PageFormsBase'
import Comment from './Comment'
import { requestUserQuery } from '@/api/user'


export default {
  name: 'SearchTab',
  components:{
    PageFormsBase,
    Comment
  },
  data () {
    return {
      typeString:['entity','relation','qa'],
      activeTab:0,
      //热门搜索数据
      hotItems:[],
      result :'',
      entities: [],
      state: '',
      timeout:  null,

      entityQuery:'',
      questionQuery:'',
      relationQuery: [null,null],

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
    loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
 
        ];
    },

    handleClick(){
        this.result = ""
        requestHotSearch(this.typeString[this.activeTab]).then(res => {
            this.hotItems = res.data.search_list
        })
    },

    querySearchAsync(queryString, cb) {
      var restaurants = this.entities;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

    clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },

    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },

    handleSelect(item) {
      console.log(item);
    },

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
    },

    PopularSearch: function(params){
        this.Search(this.activeTab,params)
    },

    onSearchBtn() {
      this.Search(this.activeTab,null)
    },

    Search(type,params){
      
      var self = this
      const ENTITY = "0"
      const RELATION = "1"
      const QA = "2"
      self.result = ""
      //判断请求类型
      
      var type_str =String(type)
      switch(type_str){
        case ENTITY:{
          if(params == null){
            params = self.entityQuery
          }
          self.entityQuery = params
          getEntity(params).then(res => {
            self.result = res.data
          })
          break;
        }
        case RELATION: 
          if(params != null){
            self.relationQuery = params.split("与")
          }
          params = self.relationQuery
          requestRelation(params).then(res => {
            self.result = res.data
          })
          break;
        case QA:
          if(params == null){
            params = self.questionQuery
          }
          self.questionQuery = params
          requestQA(params).then(res => {
            self.result = res.data
          })
          break;
        default:
          alert('defalt')
      } 
      
      //result:text
    },

    // resetForm(formName) {
    //     this.$refs[formName].resetFields();
    // }

  },


  mounted() {

    this.restaurants = this.loadAll();
    requestHotSearch(this.typeString[this.activeTab]).then(res => {
        this.hotItems = res.data.search_list
    })
  }
}
</script>

<style scoped>

.div-tab{
  float:left;
  width:80%;
  height:100%;
  border:1px black
}
.div-search{
  float:left;
  margin-top: 50px;
  width:20%;
  height:100%;
}
.div-result{
  display: inline-block;
  width:80%;
  height:auto;
  border-radius: 4px;
  border:1px solid rgb(248, 245, 245)
}
</style>
