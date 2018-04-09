<!--
    @file:登录成功后所有子模块的父组件,包含左侧导航栏,顶部菜单栏等
-->
<template>
    <div id="home">
        <el-pagination
            class="home_pa"
            background
            layout="prev, pager, next"
            :total="100">
        </el-pagination>
        <el-row  :gutter="30">
            <el-col :span="6" v-for="pr in productList" :key="pr.id" >
                <el-card :body-style="{ padding: '0px' }"  >
                    <img :src="pr.img" class="image">
                    <div style="padding: 14px;">
                        <span>{{pr.title}}</span>
                        <div class="bottom clearfix">
                          <time class="time">{{ pr.timestamp }}</time>
                          <el-button type="text" class="button">编辑</el-button>
                          <el-button type="text" class="button">查看</el-button>
                          <el-button type="text" class="button">删除</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'home',
    data () {
        return {
            productList: [
                {
                    title: 'Delicious Cookies Kids Valentine Card Kit with Stickers',
                    timestamp: '2018-04-08 22:37',
                    img: 'static/img/val_card_kit_wholekit_1.jpg',
                    id: 'q'
                },
                {
                    title: 'Delicious Cookies Kids Valentine Card Kit with Stickers',
                    timestamp: '2018-04-08 22:37',
                    img: 'static/img/wt15-popicons-washitape-1.jpg',
                    id: 'q1'
                },
                {
                    title: 'Delicious Cookies Kids Valentine Card Kit with Stickers',
                    timestamp: '2018-04-08 22:37',
                    img: 'static/img/wt15-popicons-washitape-alt.jpg',
                    id: 'q2'
                },
                {
                    title: 'Delicious Cookies Kids Valentine Card Kit with Stickers',
                    timestamp: '2018-04-08 22:37',
                    img: 'static/img/trp238_massachusetts.detail.jpg',
                    id: 'q3'
                }
            ]
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#home{
    padding:0 30px;
}
.home_pa{
    margin: 20px auto;
}
.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    text-align: left;
}

.button {
    padding: 0;
    float: right;
    margin-left: 5px;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

</style>
