<template>
    <div id="app" >
        <el-row>
              <el-col :span="3">
                  <nav-menu/>
              </el-col>
              <el-col :span="21">
                  <router-view/>
              </el-col>
        </el-row>
    </div>
</template>

<script>
import NavMenu from './components/view-componets/nav-menu.vue';
export default {
    name: 'App',
    components: {
        'nav-menu': NavMenu
    }
};
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
