<!--
    @file:顶部菜单
-->
<template>
    <div id="banner">
        <el-pagination
            class="banner_pa"
            background
            layout="prev, pager, next"
            :total="100">
        </el-pagination>
        <el-row  :gutter="30">
            <el-col :span="12" v-for="pr in productList" :key="pr.id" >
                <el-card :body-style="{ padding: '0px' }" >
                    <img :src="pr.img" class="image">
                    <div style="padding: 14px;">
                        <span>{{pr.title}}</span>
                        <div class="bottom clearfix">
                          <time class="time">{{ pr.timestamp }}</time>
                          <el-button type="text" class="button"><i class="el-icon-star-off"></i></el-button>
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
    name: 'banner',
    data () {
        return {
            productList: [
                {
                    title: 'desk & gift',
                    timestamp: '2018-04-08 22:37',
                    img: 'static/img/0926_banner1.jpg',
                    id: 'q'
                },
                {
                    title: 'LETTERPRESS CARDS & GOODS',
                    timestamp: '2018-04-08 22:37',
                    img: 'static/img/0926_banner2.jpg',
                    id: 'q1'
                },
                {
                    title: 'Letterpress Cards & Goods',
                    timestamp: '2018-04-08 22:37',
                    img: 'static/img/0926_banner3.jpg',
                    id: 'q2'
                }
            ]
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #banner{
        padding:0 30px;
    }
    .banner_pa{
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
