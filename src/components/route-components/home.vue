<!--
    @file:登录成功后所有子模块的父组件,包含左侧导航栏,顶部菜单栏等
-->
<template>
    <div id="home">
        <el-input
            placeholder="关键字搜索"
            prefix-icon="el-icon-search"
            v-model="keyWord">
        </el-input>
        <el-pagination
            class="home_pa"
            background
            layout="prev, pager, next, total"
            @current-change="getPoductList"
            :total="serverList.total"
            :page-size="pageSize"
            :current-page.sync="currentPage"
            >
        </el-pagination>
        <el-row  :gutter="30" >
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="pr in productList" :key="pr.id" style="padding-bottom: 15px;padding-top: 15px;" >
                <el-card :body-style="{ padding: '0px' }"  >
                    <img :src="pr.img" class="image" @click="checkProduct(pr.id)">
                    <div style="padding: 14px;">
                        <span>{{pr.title}}</span>
                        <div class="bottom clearfix">
                          <span class="time">{{ pr.timestamp }}</span>
                          <el-popover
                              placement="top"
                              width="200"
                              trigger="hover"
                              >
                              <p>您将删除产品“{{pr.title}}”</p>
                              <div style="text-align: right; margin: 0">
                                <el-button type="primary" size="mini" @click="deleteProduct(pr.id)">确定</el-button>
                              </div>
                              <el-button type="text" class="button" slot="reference">删除</el-button>
                          </el-popover>
                          <el-button type="text" class="button" @click="edictProduct(pr.id)">编辑</el-button>
                          <el-button type="text" class="button" @click="checkProduct(pr.id)">查看</el-button>
                        </div>
                    </div>

                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {debounce} from 'lodash';
export default {
    name: 'home',
    created () {
        this.getPoductList();
        this.debouncedGetAnswer = debounce(this.searchByWord, 500);
    },
    data () {
        return {
            visible: false,
            keyWord: null,
            pageSize: 10,
            currentPage: 1,
            serverList: {
                total: 0,
                list: [],
                current: 1
            }
        };
    },
    watch: {
        keyWord: function () {
            this.debouncedGetAnswer();
        }
    },
    computed: {
        productList: function () {
            return this.serverList.list.map(product => {
                return {
                    title: product.title,
                    timestamp: product.timestamp.split('.')[0].replace('T', ' '),
                    img: this.Api.picture + product.picture[0],
                    id: product._id
                };
            });
        }
    },
    methods: {
        searchByWord: function (value) {
            this.currentPage = 1;
            this.getPoductList();
        },
        deleteProduct: function (id) {
            this.$axios.delete(this.Api.product + id)
                .then(res => {
                    this.getPoductList();
                })
                .catch(function () {
                    console.error('delete fail');
                });
        },
        edictProduct: function (id) {
            this.$router.push({name: 'edict', params: {id: id}});
        },
        checkProduct: function (id) {
            window.open(this.Api.productDetail + id);
        },
        getPoductList () {
            this.$axios.get(this.Api.products,
                {
                    params: {
                        keyword: this.keyWord,
                        size: this.pageSize,
                        current: this.currentPage
                    }
                }).then(res => {
                this.serverList = res.data;
            }).catch(function (e) {
                console.error(e);
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-input{
    position: absolute;
    width: 200px;
    left: 30px;
    top: -5px;
}
#home{
    position: relative;
    padding:0 30px;
}
.home_pa{
    margin: 20px auto;
    text-align: right;
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
    margin-left: 4px;
    font-size: 12px;
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
