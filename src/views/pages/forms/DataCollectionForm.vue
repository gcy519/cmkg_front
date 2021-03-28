<template>
  <div>  
    <div class="div-paperinfo">
        <div id="u28" class="ax_default _形状">
            <span style="text-decoration:none;">【数据录入情况】</span>
            
            <span style="text-decoration:none;">录入文献：{{dataCollection.references_number}}     </span>
            <span style="text-decoration:none;">实体：{{dataCollection.entities_number}}          </span>
            <span style="text-decoration:none;">关系：{{dataCollection.relations_number}}         </span>
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
    background-color: rgb(190, 210, 240);
    color: white;
    }
</style>
