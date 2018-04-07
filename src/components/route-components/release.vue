<!--
    @file:发布产品
-->
<template>
    <el-form ref="form" :model="form"  :inline="false" label-position="top" class="release">
        <el-form-item label="上传产品图片">
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>
        <el-form-item label="标题title">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="库存sku">
            <el-input v-model="form.sku"></el-input>
        </el-form-item>
        <el-form-item label="价格price">
            <el-input v-model="form.price">
                <el-select v-model="select" slot="append" placeholder="选择币种">
                    <el-option label="美元(USD)" value="USD"></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                </el-select>
            </el-input>
        </el-form-item>
        <el-form-item label="描述description">
            <el-input type="textarea" :rows="4" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="细节details">
            <el-button @click.prevent="removeDetails(index)" slot="append">删除</el-button>
            <el-row  v-for="(detail, index) in form.details" :key="index">
                <el-input v-model="detail.data">
                    <el-select v-model="detail.label" slot="prepend" placeholder="名称">
                        <el-option v-for="type in detailsType" :label="type" :value="type" :key="type"></el-option>
                    </el-select>
                    <el-button @click.prevent="removeDetails(index)" slot="append">删除</el-button>
                </el-input>
            </el-row>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'release',
    data () {
        return {
            dialogVisible: false,
            dialogImageUrl: '',
            currency: '',
            detailsType: [
                'Collection',
                'Dimensions',
                'Special Finish'
            ],
            form: {
                title: '',
                sku: '',
                description: '',
                price: '',
                details: [
                    {
                        label: 'Collection',
                        data: 'Stationery &amp; Gift Products'
                    },
                    {
                        label: 'Collection',
                        data: 'Stationery &amp; Gift Products'
                    }
                ]
            }
        };
    },
    methods: {
        handleRemove (file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview (file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        removeDetails (index) {
            if (this.form.details.length > 1) {
                this.form.details.splice(index, 1);
            }
        }
    }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .release{
        text-align: left;
        padding: 20px;
    }
    .el-select{
        width: 180px;
    }
</style>
<style>
    .el-input-group__append, .el-input-group__prepend{
        background-color: #fff;
    }
</style>
