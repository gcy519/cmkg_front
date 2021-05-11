<template>
  <div>  
    <div class="div-paperinfo">
        <div id="u28" class="ax_default _形状">
            <span style="margin:10px" class="b-text">数据录入情况</span>
            
            <span style="margin:10px" class="text">录入文献数: {{dataCollection.references_number}}     </span>
            <span style="margin:10px" class="text">实体数: {{dataCollection.entities_number}}          </span>
            <span style="margin:10px" class="text">关系数: {{dataCollection.relations_number}}         </span>
        </div>
    </div>
  </div>
</template>
<script>

import { getDataCollection } from '@/api/user'

export default {
  data() {
    return {
      dataCollection:{
        	entities_number: 1, 
            relations_number: 2, 
            references_number: 3
      },
    };
  },
  methods: {
  },
  created() {},
  mounted() {
    getDataCollection().then(res => {
      this.dataCollection = res.data
    })

  },


};
</script>
<style scoped>
    .div-paperinfo{
    background-color: #CCCCCC;
    color: white;
    }

    .b-text{
      font-family: PingFang SC;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
    }
    .text{
      font-family: PingFang SC;
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
      line-height: 22px;
    }
</style>
