<!--
    @file:发布产品
-->
<template>
    <el-form ref="form" :model="form"  :inline="false" label-position="top" class="release">
        <el-form-item label="上传产品图片">
            <el-upload
                :action="this.Api.picture"
                list-type="picture-card"
                :before-upload="beforeUpload"
                :on-success="onSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>
        <el-row :gutter="30">
            <el-col :span="12">
                <el-form-item label="标题title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="库存sku">
                            <el-input v-model="form.sku"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="价格price">
                            <el-input v-model="form.price">
                                <el-select v-model="form.currency" slot="append" placeholder="选择币种" class="unit">
                                    <el-option label="美元(USA$)" value="$"></el-option>
                                    <el-option label="人民币(CNY￥)" value="￥"></el-option>
                                    <el-option label="英镑(£)" value="£"></el-option>
                                    <el-option label="欧元(€)" value="€"></el-option>
                                </el-select>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="类别occasion">
                    <el-select
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        v-model="form.occasion" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item"
                          :label="item"
                          :value="item">
                        </el-option>
                      </el-select>
                </el-form-item>
                <el-form-item label="描述description">
                    <el-input type="textarea" :rows="4" v-model="form.description"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="细节details">
                    <el-button  type="primary"  @click.prevent="addDetails()">添加细节</el-button>
                    <el-row  v-for="(detail, index) in form.details" :key="index" class="item">
                        <el-input v-model="detail.value">
                            <el-select v-model="detail.label"
                                filterable
                                allow-create
                                default-first-option
                                slot="prepend"
                                placeholder="名称">
                                <el-option v-for="type in detailsType" :label="type" :value="type" :key="type"></el-option>
                            </el-select>
                            <el-button @click.prevent="removeDetails(index)" slot="append">删除</el-button>
                        </el-input>
                    </el-row>
                </el-form-item>
            </el-col>
        </el-row>
        <el-button type="primary" @click.prevent="releaseProduct()">发布</el-button>
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
            options: ['love'],
            detailsType: [
                'Collection',
                'Dimensions',
                'Special Finish'
            ],
            form: {
                picture: [],
                title: '',
                sku: '',
                description: '',
                price: '',
                occasion: [],
                currency: '$',
                details: [
                    {
                        label: 'Collection',
                        value: 'Stationery &amp; Gift Products'
                    },
                    {
                        label: 'Dimensions',
                        value: 'Stationery &amp; Gift Products'
                    }
                ]
            }
        };
    },
    methods: {
        beforeUpload (file) {
            const allowedFileTypes = ['image/png', 'image/jpeg', 'image/gif'];
            const isLt10M = file.size / 1024 / 1024 < 10;
            const isPicture = allowedFileTypes.indexOf(file.type) > -1;
            if (!isPicture) {
                this.$message.error('只能上传png/jpeg/gif图片!');
            }
            if (!isLt10M) {
                this.$message.error('上传图片大小不能超过 10MB!');
            }
            return isPicture && isLt10M;
        },
        onSuccess (response, file, fileList) {
            this.form.picture.push(response._id);
        },
        handleRemove (file, fileList) {
            console.log(file, fileList);
            const self = this;
            self.$axios.delete(self.Api.picture + file.response._id)
                .then(function (res) {
                    console.info('delete sucess');
                })
                .catch(function () {
                    console.error('delete fail');
                });
        },
        handlePictureCardPreview (file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        removeDetails (index) {
            if (this.form.details.length > 1) {
                this.form.details.splice(index, 1);
            }
        },
        addDetails () {
            this.form.details.push({
                label: 'Dimensions',
                value: ''
            });
        },
        releaseProduct () {
            console.log(this.form);
            const self = this;
            self.$axios.post(self.Api.product, self.form)
                .then(function (res) {
                    console.info('release sucess');
                })
                .catch(function () {
                    console.info('release fail');
                });
        }
    }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .release{
        text-align: left;
        padding: 0 20px;
    }
    .el-select{
        width: 100%;
    }
    .unit{
        width: 150px;
    }
    .item .el-select{
        width: 170px;
    }
    .item{
        margin: 10px 0;
    }
</style>
<style>
    .el-input-group__append, .el-input-group__prepend{
        background-color: #fff;
    }
</style>
