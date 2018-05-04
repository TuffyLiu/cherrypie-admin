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
                                <el-select v-model="form.currency" slot="append" placeholder="选择币种">
                                    <el-option label="美元(USA$)" value="$"></el-option>
                                    <el-option label="人民币(CNY￥)" value="￥"></el-option>
                                    <el-option label="英镑(£)" value="£"></el-option>
                                    <el-option label="欧元(€)" value="€"></el-option>
                                </el-select>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="标签">
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    </el-col>
                </el-row>

                <el-form-item label="描述description">
                    <el-input type="textarea" :rows="4" v-model="form.description"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="细节details">
                    <el-button  type="primary"  @click.prevent="addDetails()">添加细节</el-button>
                    <el-row  v-for="(detail, index) in form.details" :key="index" class="item">
                        <el-input v-model="detail.data">
                            <el-select v-model="detail.label" slot="prepend" placeholder="名称">
                                <el-option v-for="type in detailsType" :label="type" :value="type" :key="type"></el-option>
                            </el-select>
                            <el-button @click.prevent="removeDetails(index)" slot="append">删除</el-button>
                        </el-input>
                    </el-row>
                </el-form-item>
            </el-col>
        </el-row>
        <el-button type="primary" @click.prevent="addDetails()">发布</el-button>
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
                currency: '$',
                details: [
                    {
                        label: 'Collection',
                        data: 'Stationery &amp; Gift Products'
                    },
                    {
                        label: 'Dimensions',
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
        },
        addDetails () {
            this.form.details.push({
                label: 'Dimensions',
                data: ''
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
