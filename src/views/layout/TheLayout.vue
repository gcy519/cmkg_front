<template>
  <div>
  <div style="height:30%">
    <the-header></the-header>
  </div>
  <div>
    <el-container>
      <el-main><the-main></the-main></el-main>
      <el-footer><the-footer></the-footer></el-footer>
    </el-container>
  </div>
  </div>
</template>

<script>
import TheLayoutHeader from './TheLayoutHeader'
import TheLayoutSidebar from './TheLayoutSidebar'
import TheLayoutFooter from './TheLayoutFooter'
import TheLayoutMain from './TheLayoutMain'

export default {
  name: 'TheLayout',

  components: {
    'the-header': TheLayoutHeader,
    'the-sidebar': TheLayoutSidebar,
    'the-footer': TheLayoutFooter,
    'the-main': TheLayoutMain
  }
}
</script>

<style scoped lang="scss">
  .page {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;

  .page-main {
    box-sizing: border-box;
    padding-top: 60px;
    height: 100%;
    

  .page-content {
    overflow: auto;
    margin-left: 240px;
    height: 100%;
    background-color: #fdfdfd;
  }

  .page-content-hide-aside {
    margin-left: 65px;
  }
  }
}
</style>
