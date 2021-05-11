<template>
<div class="home-background">
    <!-- <div style="margin: 10px"> -->
      <el-radio-group class="text" v-model="radio_source" @change="changSource">
        <!-- <el-radio :label="0">西游记</el-radio> -->
      </el-radio-group>
    <!-- </div> -->
  <div class="m-home">
  <DataCollection></DataCollection>

  <SearchTab></SearchTab>


  <div class="div-bottom">

    <div align="center" class="div-title"><h1 style="center" class="h1-title">子图展示</h1></div>
      <div class="echarts-container bg-background">
        <div style="width:100%">
            <the-graph></the-graph>
        </div> 
      </div> 
    </div> 

  <div class="div-top">
      <div align="center" class="div-title"><h1 style="center" class="h1-title">图谱展示</h1></div>
      <div class="echarts-container bg-background">
        <the-tree ref='treeCharts'></the-tree>
      </div>
  </div>


  </div>

  <div class="div-half">
    
      <div align="center" class="div-title"><h1 style="center" class="h1-title">知识角</h1></div>
      <div class="other-container bg-background">
        <div class="div-knowlege-corner">
          {{corner_story}}
        </div>

        <div style="float:right; margin-right:15px">
          <el-button size="small" type="primary" round>查看子图</el-button>
          <el-button size="small" type="primary" round @click="ChangeStory">换个故事</el-button> 
        </div>
    </div>

  </div>

  <div class="div-half-two">
    
      <div align="center" class="div-title">
        <h1 style="center" class="h1-title">热门榜</h1>
      </div>
      <div class="other-container bg-background">
      <div style="margin-top:10px;height:80%; width:100%" class="bg-background">
        <div class="div-entity-list"> 
            <el-col :span=30>
              <el-dropdown @command="handleBoardCommand">
                <span class="el-dropdown-link">
                  {{currentBoards}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item class="text"
                        v-for="(item,index) in list_boards"
                        :key="index"
                        :command="index"
                        :value="item">
                      {{item}}
                      </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
              <div class="div-outline" style="width: 150px">
          　　　　<ul class="ul-board" >
          　　　　　　<li style="width: 100px" v-for="(item,index) in billboard"
                        v-bind:key="index"
                        v-bind:class="[ 'li-unactive',billboard_active[index]? 'li-active' : '']"
                        @click="selectEntity(item, index)" >{{item.name}}
          　　　　　　</li>
          　　　　</ul>
              </div>
          </div>
          <div class="div-entity-intro text">
            {{entityInfo}}
          </div>
      </div>
    </div>
  </div>

<div class="div-comment">
<el-dialog
  title="发布留言"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
    <el-form ref="messForm" :model="messForm" :rules="rules" label-width="80px">
    <el-row type="flex" justify="center">
      <el-col>
        <el-form-item label="留言内容" prop="content">
          <el-input type="textarea" v-model="messForm.content"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="postComment">确 定</el-button>
  </span>
</el-dialog>


    <!-- <el-row type="flex" justify="center">
      <el-col :span=12>
        <el-image :src="src" class="login_image"></el-image>
      </el-col>
    </el-row> -->
    <el-form ref="messForm" :model="messForm" :rules="rules" label-width="80px">
      <el-row type="flex" justify="center">
        <el-col>
          <el-card class="card-comment">
    　　　　<ul style="list-style:none">
    　　　　　　<li v-for="(comment,index) in comments" 
                  v-bind:key="index">{{comment}}
    　　　　　　</li>
    　　　　</ul>
          </el-card>
        </el-col>
      </el-row>
    </el-form>
        <el-row>
          <el-button class="btn-comment" type="text" @click="dialogVisible = true">点击留言</el-button>
        </el-row>
</div>
</div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import VeScatter from 'v-charts/lib/scatter.common'
import Tree from './forms/Tree'
import Graph from './forms/Graph'
import SearchTab from './forms/SearchTab'
import DataCollection from './forms/DataCollectionForm'
import { getAllEntity,requestPostComment,requestStory,requestBoardList,requestBillboard, requestEntity} from '@/api/user'


//todo 定期读取comment 文献数量
export default {
  name: 'PageHome',
  components: {
    VeLine,
    VeScatter,
    SearchTab,
    'the-tree' : Tree,
    'the-graph': Graph,
    DataCollection
  },
  data () {
    return {
      dataCollection:{
        		entities_number: 999, 
            relations_number: 999, 
            references_number: 0
      },
      corner_story:"这里展示一些文本信息，比如神话故事，以及典故。每日更换",
      list_boards: ['少儿最喜欢榜','最具社会影响力榜','最具商业价值榜'],
      currentBoards:'选择榜单',
      dialogVisible: false,
      billboard_active: [],
      billboard: [],
      comments: [
         "本模块暂不对外开放" ,
         "如有需求，请联系我们，联系方式见页底",
      ],
      entityInfo:'人物介绍:选中人物时，这里出现相应的人物介绍，比如哪吒，中国古代神话传说中的神仙，佛教及道教护法神。兴盛于道教与民间信仰，在道教头衔为中坛元帅、通天太师、威灵显赫大将军、三坛海会大神等；尊称太子爷、三太子、善胜童子。',
      radio_source: 0,
          messForm: {
            tag: 0,
            content: ''
          },
          rules: {
            content: [
              { required: true, trigger: 'blur', message: '你还没有留言' },
              { max: 300, message: '请不要超过300个字符', trigger: 'blur' } 
            ],
          },
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        }
      },
      props: {
        username: {
          type: String
        }
    
  },
  methods: {
      handleBoardCommand(command) {
        /*
        requestBoardList().then(res => {
          this.$message('click on item ' + res.data);
          this.list_boards = res.data
          
        })
        */
        this.currentBoards = this.list_boards[command]
        requestBillboard(command).then (res => {
              this.billboard = res.data
              this.billboard_active = new Array(this.billboard.length).fill(false);//[0,0,0,0,0]
        })

      },

    ChangeStory(){
      requestStory().then(res => {
          this.corner_story = res.data.knowledge
      })
    },

    changSource(source){
      var sourceName = ["西游记"]
      if (source.length == 0){
        source = sourceName[this.radio_source]
      }
      this.$refs.treeCharts.setGraph(source)
    },

　　selectEntity (item, index) {
　　　　　this.$nextTick(function () {
  
          getEntity(this.billboard[index]).then(res => {
            alert(index,this.billboard[index])
            this.entityInfo = res.tada
          })
          
　　　　　　　this.billboard_active = new Array(this.billboard.length).fill(false)
            this.billboard_active[index] = true;
          
　　　　　});
　　},

    postComment(){
      this.dialogVisible = false
      var params = this.messForm.content
      this.comments.push(params)
      requestPostComment(params).then(res => {
           this.$message(res.message);
           if (res.status == 200) {
            this.messForm.content = ''
            this.messForm.tag = 0
            this.$emit('submitMess')
          }
      })
    },
    openComment(){
      console.log('waw')
      this.$message({
        message: '删除' + row.name + '成功！',
        type: 'success'
      })
    },
    // submitMess (formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       let param = new URLSearchParams()
    //       param.append('username', this.username)
    //       param.append('content', this.messForm.content)
    //       param.append('tag', this.messForm.tag)
    //       param.append('created_time', (new Date()).toLocaleString())      
    //       axios.post('http://backend.docker.io/addMessage/', param)
    //         .then((res)=> {
    //           if (res.data == 'messagesuccess') {
    //             this.$notify.success({
    //               title: '提示',
    //               message: '留言成功！',
    //               showClose: false
    //             });
    //             this.messForm.content = ''
    //             this.messForm.tag = 0
    //             this.$emit('submitMess')
    //           }
    //         })
    //     } else {
    //       return false;
    //     }
    //   });
    // },
 
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
  },

  mounted() {
    getAllEntity().then(res => {
      this.billboard = res.data
    });

    this.changSource("西游记");
  }
}
</script>

<style scoped lang="scss">
.m-home {
  .m-box-card {
    margin-bottom: 10px;
    color: #666666;
    .m-icon {
      float: left;
      width: 60px;

      i {
        font-size: 40px;
      }
    }

    .m-content {
      margin-left: 60px;

      .m-count {
        font-size: 20px;
      }
    }
  }
  .image{
    max-width:800px;
    max-height:800px;
  }

  .m-task-box {
    margin-bottom: 20px;

    .m-task-text {
      float: left;
      line-height: 16px;
    }

    .m-task-pro {
      margin-left: 60px;
    }
  }
}
</style>
<style>

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.image{
    width: 60%;
    height: 60%;
}

.bg-background{
    width: 100%;
    background: #F8F8FC;
    border-radius: 4px;
}

.div-comment{
  margin-top:30px;
  height:190px;
  clear:"both";
}

.card-comment{
  margin-top:10px;
  height:100px;
  overflow: auto;
  overflow-y: scroll;
  font-size:12px;
}

.btn-comment{
  width:100%;
  height: 60%;
  background-color: chocolate;
  color: white;
}

  .graph-card {
    width: 500px;
    height: 550px;
  }

  .function-content{
    width: 50%;
    height: 400px;
    border:1px solid;
    border-radius:2px;
  }

  .div-top{
    width:100%;
    height:50%;
    border: 1px solid #4660EF;
    box-sizing: border-box;
    border-radius: 4px;
    margin:10px;
  }
  .div-bottom{
    width:100%;
    height:50%;
    border: 1px solid #4660EF;
    box-sizing: border-box;
    border-radius: 4px;
    margin:10px;
  }

  .div-half{
    float:left;width:48%;
    border: 1px solid #4660EF;
    box-sizing: border-box;
    border-radius: 4px;
    height:400px;margin:10px;
  }
  .div-half-two{
    float:left;width:48%;
    height:400px;margin:10px;     
    border: 1px solid #4660EF;
    box-sizing: border-box;
    border-radius: 4px;
  }

  .div-knowlege-corner{
    padding: 10px;
    width:94%;height:68%;
    margin:3% 3% 3% 3%; 
    border:1px solid #4660EF;
    overflow:auto;
    overflow-y:scroll;
  }

  .div-left{ float:left;width:85%;height:90%;border:0px solid #F00} 
  .div-right{ float:left;width:15%;height:90%;border:0px solid #000} 

  .btn-list{
    float:left;
  }
  .div-entity-list{
    
    float:left;margin:3%;width:30%;height:90%;
  }

  .div-outline{
    background: #FFFFFF;
    display:inline-block;margin-top:5%; width:60%;height:90%;border:1px solid #000;
    overflow:auto;
    overflow-y:scroll;
  }

  .div-entity-intro{
    padding: 10px;
    float:left;margin:3%;width:57%;height:90%; border: 1px solid #4660EF;
    background:#FFFFFF;
    overflow:auto;
    overflow-y:scroll;
  }

  .li-unactive{
    font-size: 15px;
  }
　.li-active{
    background:wheat;
    font-size: 4px;
    color:red
　}
  .ul-board{
    list-style-type: none;
    padding: 0px;
    margin: 0px;
  }
  .echarts-container{
    margin-top:2%;
    height:85%;
    width: 100%;
  }

  .other-container{
    margin-top:2%;
    height:85%;
    width: 100%;
  }

  .h1-title{
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 500;
    font-size: 19px;
    line-height: 24px;
    color: #2F2F3F;
  }

  .div-title{
    margin-top:15px;
  }

  .home-background{
    width: 100%;
    background: #CCCCCC;
    height: 100%;
  }

  .text{
    font-family: PingFang SC;
    font-style: normal;
    font-size: 14px;
    line-height: 22px;
  }


</style>
