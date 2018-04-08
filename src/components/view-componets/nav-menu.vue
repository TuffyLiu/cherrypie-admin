<!--
    @file:登录成功后所有子模块的父组件,包含左侧导航栏,顶部菜单栏等
-->
<template>
    <el-menu default-active="2" :router="true" id="nav-menu">
        <el-menu-item index="/">
            <i class="el-icon-picture"></i>
            <span slot="title">所有产品</span>
        </el-menu-item>
        <el-menu-item index="release" >
            <i class="el-icon-edit"></i>
            <span slot="title">产品发布</span>
        </el-menu-item>
        <el-menu-item index="nav">
            <i class="el-icon-tickets"></i>
            <span slot="title">顶部菜单</span>
        </el-menu-item>
        <el-menu-item index="banner">
            <i class="el-icon-star-on"></i>
            <span slot="title">首页广告</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    name: 'nav-menu',
    data () {
        return {
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #nav-menu{
        position: fixed;
        top:0;
        bottom: 0;
        width: 140px;
        left: 0;
    }
</style>
