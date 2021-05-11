<template>
  <div class="header el-button--primary">
    <router-link to="/index">
      <div class="logo">
        <span class="title-text">神话知识图谱</span>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ThemePicker from '@/components/ThemePicker'

export default {
  name: 'TheLayoutHeader',
}
</script>

<style scoped lang="scss">
.header {
  background: url("../../assets/header.jpg")no-repeat;
  background-size:100% 110%;
  letter-spacing:10px;
  color: #ffffff;
  height: 220px;
  user-select: none;

  div {
    display: inline-block;
  }

  .logo {
    width: 100%;
    text-align: center;
    font-size: 65px;
    margin-top: 3%;
    cursor: pointer;
    .title-text{
      font-family: PingFang SC;
      font-style: normal;
      color:black
    }
  }

}

</style>
