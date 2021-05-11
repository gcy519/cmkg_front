<template>
  <div>  
      <div style="float:right; width:30%">
        <div style="float:right;margin:7px">
            <el-col>
              <el-button size="small" type="primary">上传<i class="el-icon-upload"></i></el-button>
              <el-button size="small" type="primary">下载<i class="el-icon-download"></i></el-button> 
            </el-col>
        </div>
        <div style="margin-top:20%;margin-right:20%;height:250px;overflow:auto;">
          <el-card v-if="info.length>0">
          {{info}}
          </el-card>
        </div>
    </div>
    <div id="graph" style="width:70%;height:350px"></div>
  </div>
</template>
<script>
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/graph";
// import VueResource from 'vue-resource'
import {getGraph,getTailEntity,getEntity} from '@/api/user'

export default {
  data() {
    return {
      info:"",
      clicked:[],
      graph: "",
      eidMapIndex:{},
      index:0,
      timer:0,
      pointData: [],
      linkData: [],
      categoryData: [],
      options: {
        // title: {
        //   text: "中国神话知识图谱"
        // },
        series: [
          {
            name: "知识图谱",
            type: "graph",
            layout: "force",
            roam:true,
            force: {
              repulsion: 40,
              gravity: 0.01,
              edgeLength: 40,
              layoutAnimation: true
            },
            data: [],
            links: [],
            categories: [],
            symbol: 'circle',
            symbolSize: 25,
            cursor: 'pointer',
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: "{b}",
                fontSize: 12,
                fontStyle: "600"
              }
            },
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 1.5,
                curveness: 0
              }
            }
          }
        ]
      }
    };
  },
  methods: {


    setPointData(list, category,id, value) {
      list.forEach((name, index) => {
        this.pointData.push({
          id: id,
          x: index * 50,
          y: 20 + index * 50,
          name:name,
          value:value,
          category:category,
          draggable: true
        });
      });
    },

    setPoint(name, category,id, value) {
      this.eidMapIndex[id] = this.pointData.length
      this.pointData.push({
          id: id.toString(),
          x: id-60,
          y: 5 + id,
          name:name,
          value:value.toString(),
          category:category,
          draggable: true
      });
    },

    setLink(s, t) {
      var source = s.toString()
      var target = t.toString()

      this.linkData.push({
          source,
          target,
          lineStyle: {
            normal: {
              color: "source"
            }
          }
      });
    },

    setLinkData(list, target) {
      list.forEach(source => {
        this.linkData.push({
          source,
          target,
          lineStyle: {
            normal: {
              color: "source"
            }
          }
        });
      });
    },

    setCategoryData(list) {
      list.forEach(name => {
        this.categoryData.push({ name });
      });
    },

    getEntityInfo(name){
      var _this = this
      getEntity(name).then(res => {
        _this.info = ""
        if(res.data.description != null){
          _this.info = res.data.description
        } 
      })
    },
    initDynamicFunc(){
      var _this = this

      this.graph.on('click', function(params) {

            console.log(params)
            var sourceName = params.name
            var sourceId = params.data.id

            //跳过已经存在的子图
            for (var i = 0; i < _this.clicked.length; i++) {
                if (_this.clicked[i] == sourceId) {
                  return;
                }
            }
            _this.clicked.push(sourceId)
            
            var pointIndex = _this.pointData.length


            _this.getEntityInfo(sourceName)

            var index = 0;
            getTailEntity(sourceName).then(res => {
              for(var i = 0; i < res.data.tail.length; ++i){
                var node = res.data.tail[i]

                for (var j = 0; j < _this.pointData.length; j++) {
                  if (_this.pointData[j].id == node.eid) {
                    return;
                  }
                }
                _this.setPoint(node.name, node.category, node.eid, node.eid)
                _this.categoryData.push(node.category);
                _this.setLink(sourceId,node.eid)
                _this.options.series[0].data.push(_this.pointData[pointIndex+index]);
                index += 1;
                _this.graph.setOption(_this.options);
              }
            })
          _this.options.series[0].links = _this.linkData;
          _this.options.series[0].categories = _this.categoryData;
        
          _this.graph.setOption(_this.options);
      });
    },

    getGraphSource(){
        this.graph = echarts.init(document.getElementById("graph"));
        var source = "西游记";
        getGraph(source).then(res => {
          // this.options.series[0].data[0] = res.data
          for(var i = 0; i < res.data.data.nodes.length; ++i){
              var node = res.data.data.nodes[i]

              this.setPoint(node.name, node.category, node.eid, node.eid)
              this.categoryData.push(node.category);
          }

          for(var i = 0; i < res.data.data.edges.length; ++i){
              var edge = res.data.data.edges[i]
              this.setLink(edge.head,edge.tail)
          }

          // this.options.series[0].data = this.pointData;
          // this.options.series[0].categories = this.categoryData;
          // this.options.series[0].links = this.linkData;

          // this.$nextTick(() => {
          //   this.graph.setOption(this.options);
          // });
        })
        this.addNode()
    },

    //动态加入节点
    addNode(){
      this.timer = setInterval(()=>{
          if(this.index < this.pointData.length){
            this.options.series[0].data.push(this.pointData[this.index]);
            this.graph.setOption(this.options);
            this.index += 1;
          }else{
            this.options.series[0].links = this.linkData;
            this.graph.setOption(this.options);
            clearInterval(this.timer);
          }
          this.options.series[0].categories = this.categoryData;
          // alert('nodes: ' + this.pointData[this.index]);
          // console.log('links: ' + data.length);    
        },300)
    }
  },
  
  destroyed () {
      clearInterval(this.timer);
  },
  created() {},
  mounted() {
    this.graph = echarts.init(document.getElementById("graph"));

    //test data
    // let pointList = [["姜子牙",  "太乙", "哪吒","申公豹","元始天尊"],
    // ["崑崙山", "太華山", "雲霄洞", "絕龍嶺", "分宮樓"],
    // ["闡教"]]
    // let category = ["人物","地点","教派"]
    
    //list,category
    // for(var i = 0;i < pointList.length; ++i){
    //   this.setPointData(pointList[i], category[i%category.length], i, "gcy");
    // }

    // //list,element
    // //todo : 点击，和数据请求的联动
    // this.setLinkData(pointList[0], "姜子牙");
    // this.setLinkData(pointList[1], "姜子牙");
    // this.setLinkData(pointList[2], "姜子牙");

    // //categories list
    // this.setCategoryData(category);

    // this.options.series[0].data = this.pointData;
    // this.options.series[0].categories = this.categoryData;

    // this.$nextTick(() => {
    //   this.graph.setOption(this.options);
    // });  

    //获取graph数据源
    this.getGraphSource();
    //初始化
    this.initDynamicFunc();
    

  },
};
</script>
<style scoped>
#graph {
}
</style>