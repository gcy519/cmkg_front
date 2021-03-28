<template>
  <div class="m-home">
  <DataCollection></DataCollection>
  <SearchTab></SearchTab>

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

<div class="div-comment">
  <el-card style="height:98%">
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


    <!-- <el-form-item>
        <el-button type="primary" @click="submitMess('messForm')">立即发布</el-button>
    </el-form-item> -->
    </el-row>
  </el-form>
        <el-row>
        <el-button class="btn-comment" type="text" @click="dialogVisible = true">点击留言</el-button>
      </el-row>
</el-card>
</div>

  <div class="div-half">

    <!-- <div class="function-content grid-content bg-purple"> -->
      <div align="center"><h1 style="center">子图展示图</h1></div>
      <div style="margin: 10px">

        <el-radio-group v-model="radio_source" @change="changSource">
          <el-radio :label="0">待补充</el-radio>
          <el-radio :label="1">西游记</el-radio>
        </el-radio-group>

      </div>
      <div class="grid-content bg-purple">
        <the-tree ref='treeCharts'></the-tree>
      </div>
  </div>

  <div class="div-half-two">

   <!-- <div class="function-content grid-content bg-purple"> -->
    <div align="center"><h1 style="center">整体展示图</h1></div>

    <div class="div-left">
      <the-graph></the-graph>
    </div> 
    <div class="div-right">
      <el-button-group>
        <el-button size="small" type="primary">下载<i class="el-icon-download"></i></el-button>
        <br>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed">
          <el-button size="small" type="primary">上传<i class="el-icon-upload"></i></el-button>
          <div slot="tip" class="el-upload__tip">上传不超过500kb的json图谱文件</div>
        </el-upload>
      </el-button-group>
    </div> 

   <!-- </div> -->
  </div>

  <div class="div-half">
    <div align="center"><h1 style="center">知识角</h1></div>
    <div class="div-knowlege-corner">
        {{corner_story}}
    </div>
    <el-button round>查看子图</el-button>
    <el-button round @click="ChangeStory">换个故事</el-button>
  </div>

  <div class="div-half-two">
    <div class="div-entity-list"> 
      <el-col :span=30>
        <el-dropdown @command="handleBoardCommand">
          <span class="el-dropdown-link">
            {{currentBoards}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
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

    <div class="div-entity-intro">
    {{entityInfo}}
     </div>
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
         "希望能多介绍一些哪吒的事迹～～" ,
         "这个知识图谱可以帮助我很快的了解人物体系，点赞！",
         "可以出一个山海经的知识图谱嘛？" 
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

    changSource(){
      var sourceName = ["0","西游记"]
      this.$refs.treeCharts.setGraph(sourceName[this.radio_source])
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
    })
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
  .div-half{
    float:left;width:48%;height:400px;margin:10px; border:2px solid #000
  }
  .div-half-two{
    float:left;width:48%;height:400px;margin:10px; border:2px solid #000
  }

  .div-knowlege-corner{
    width:96%;height:68%;margin:2%; border:2px solid #000;
    overflow:auto;
    overflow-y:scroll;
  }

  .div-left{ float:left;width:85%;height:90%;border:0px solid #F00} 
  .div-right{ float:left;width:15%;height:90%;border:0px solid #000} 

  .btn-list{
    float:left;
  }
  .div-entity-list{
    float:left;margin:3%;width:30%;height:70%;

  }

  .div-outline{
    display:inline-block;margin-top:5%; width:100%;height:100%;border:1px solid #000;
    overflow:auto;
    overflow-y:scroll;
  }

  .div-entity-intro{
    float:left;margin:3%;width:55%;height:90%;border:1px solid #000;
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

</style>
