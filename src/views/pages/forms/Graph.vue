<template>
  <div>  
    <div id="graph" style="width:480px;height:350px"></div>
  </div>
</template>
<script>
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/graph";
// import VueResource from 'vue-resource'
import {getGraph} from '@/api/user'

export default {
  data() {
    return {
      graph: "",
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
            force: {
              repulsion: 60,
              gravity: 0.1,
              edgeLength: 15,
              layoutAnimation: true
            },
            data: [],
            links: [],
            categories: [],
            roam: false,
            symbol: 'circle',
            symbolSize: 40,
            cursor: 'pointer',
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: "{b}",
                fontSize: 16,
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
    init(){
      this.graph.on('click', function (params) {
            console.log(params.value)
      });

    },
    setPointData(list, category) {
      list.forEach((name, index) => {
        this.pointData.push({
          x: index * 50,
          y: 20 + index * 50,
          name:name,
          value:"gcy",
          category:category,
          draggable: true
        });
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
    getGraphSource(){
        this.graph = echarts.init(document.getElementById("tree"));
        var source = "西游记";
        getGraph(source).then(res => {
          this.options.series[0].data[0] = res.data
          alert(res.data.data.nodes[0].name)
          // this.$nextTick(() => {
          //   this.graph.setOption(this.options);
          // });
              
        })
    }
  },
  created() {},
  mounted() {

    this.graph = echarts.init(document.getElementById("graph"));


    this.getGraphSource();
    //node.json(id,name,category)
    //link.json(ids,id)
    let pointList = [["姜子牙", "元始天尊", "赤精子", "雲中子", "南極仙翁","申公豹"],
    ["崑崙山", "太華山", "雲霄洞", "絕龍嶺", "分宮樓"],
    ["排山倒海", "五火七禽扇", "降龙十八掌", "九阴白骨爪", "九阴真经"],
    ["闡教"]]
    let category = ["人物","地点","法术","教派"]
    //list,category

    for(var i = 0;i < category.length; ++i){
      this.setPointData(pointList[i], category[i]);
    }

    //list,element

    //todo : 点击，和数据请求的联动

    this.setLinkData(["元始天尊","崑崙山"], "姜子牙");
    this.setLinkData(["闡教"], "元始天尊");

    //categories list
    this.setCategoryData(category);

    this.options.series[0].data = this.pointData;
    this.options.series[0].links = this.linkData;
    this.options.series[0].categories = this.categoryData;

    this.$nextTick(() => {
      this.graph.setOption(this.options);
    });
    this.init();

  },
};
</script>
<style scoped>
#graph {
}
</style>