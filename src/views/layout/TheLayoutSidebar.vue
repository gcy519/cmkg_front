<template>
  <aside class="sidebar" >
    <el-menu :default-active="selectMenu" class="sidebar-menu" router="true">
      <template v-for="menu in Menu">
        <el-menu-item v-if="!menu.children" :key="menu.name" :index="menu.path">
          <i :class="menu.icon" v-if="menu.icon"></i>
          <span slot="title">{{ $t(menu.title) }}</span>
        </el-menu-item>
        <the-submenu :key="menu.name" :subMenu="menu" v-else :i18n="i18n"></the-submenu>
      </template>
    </el-menu>
  </aside>
</template>

<script>

import TheLayoutSubSidebar from './TheLayoutSubSidebar'
import staticRouter from '@/router/staticRouter'

let menus = []
staticRouter.forEach(r => {
  menus = r.menu ? menus.concat(r.children) : menus
})
export default {
  name: 'TheLayoutSidebar',
  data(){
    return{
      Menu:menus
    }
  },
  components: {
    'the-submenu': TheLayoutSubSidebar
  },
  computed: {
    selectMenu () {
      return this.$route.meta.menuPath || this.$route.path
    },
    // ...mapState(['user'])
  },
  methods: {
    i18n: function (key) {
      return this.$t(key)
    }
  }
}
</script>

<style scoped lang="scss">
.sidebar {
  float: left;
  width: 240px;
  height: 100%;
  border-right: 1px solid #e6e6e6;
  overflow: auto;

  .sidebar-menu {
    border: none;
    height: 100%;
  }
}

.sidebar-hide {
  width: 65px;
}
</style>
