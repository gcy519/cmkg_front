<template>
  <div>  
    <div id="tree" style="margin-top:10px; height:340px"></div>
  </div>
</template>
<script>
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/graph";
import {getTree} from '@/api/user'

export default {
  data() {
    return {
      graph: "",
      options : {
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            series: [
                {
                    type: 'tree',

                    data: [0],

                    top: '2%',
                    bottom: '14%',

                    layout: 'radial',

                    symbol: 'emptyCircle',

                    symbolSize: 6,

                    initialTreeDepth: 1,

                    animationDurationUpdate: 750

                }
            ]
        }
    };
  },
  methods: {
    setGraph(source){
          this.graph = echarts.init(document.getElementById("tree"));
          getTree(source).then(res => {
            
            this.options.series[0].data[0] = res.data
            this.$nextTick(() => {
              this.graph.setOption(this.options);
            });
                
          })
    }
  },
  created() {},
  mounted() {
    this.graph = echarts.init(document.getElementById("tree"));
    this.options.series[0].data[0] =JSON.parse('\
      {\
        "code": 200, \
        "data": {\
              "name": "'+'", \
              "children": [\
                {"name": "唐僧师徒", \
                "children": [\
                  {"name": "孙悟空", "has_father": true},\
                      {"name": "唐三藏", "has_father": true}, \
                      {"name": "猪八戒", "has_father": true}, \
                      {"name": "沙悟淨", "has_father": true}, \
                      {"name": "白龙马", "has_father": true}\
                      ]\
            }\
          ]\
        }\
      }').data
      this.graph.setOption(this.options);
  },

};
</script>
<style scoped>
#graph {
}
</style>