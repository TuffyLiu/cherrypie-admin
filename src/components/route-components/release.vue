<!--
    @file:发布产品
-->
<template>
    <div class="release">
        <el-form ref="ruleForm" :model="form"  :rules="rules" :inline="false" label-position="top" >
            <el-form-item label="上传产品图片"  prop="picture">
                <el-upload
                    :action="this.Api.picture"
                    list-type="picture-card"
                    :before-upload="beforeUpload"
                    :on-success="onSuccess"
                    :on-preview="handlePictureCardPreview"
                    :file-list="fileList"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-row :gutter="30">
                <el-col :span="12">
                    <el-form-item label="标题title" prop="title">
                        <el-input v-model="form.title" :maxlength="100"></el-input>
                    </el-form-item>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="库存sku" prop="sku">
                                <el-input v-model="form.sku" :maxlength="20"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="价格price" prop="price">
                                <el-input v-model.number="form.price">
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
                    <el-form-item label="类别occasion" prop="occasion">
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
                    <el-form-item label="描述description" prop="description">
                        <el-input type="textarea" :rows="4" v-model="form.description"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="细节details" prop="details">
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
            <el-button v-if="edict" type="primary" @click.prevent="updateProduct('ruleForm')">发布</el-button>
            <el-button v-else type="primary" @click.prevent="releaseProduct('ruleForm')">发布</el-button>
        </el-form>
        <el-dialog
              title="发布成功"
              :visible.sync="dialogSuccess"
              width="30%"
              center>
              <p class="icon-dialog"><i class="el-icon-success"></i></p>
              <span slot="footer" class="dialog-footer">
                <el-button  size="small" type="info" @click="continueEdict">继续修改</el-button>
                <el-button  size="small" type="primary" @click="releaseNews">发布新品</el-button>
                <el-button  size="small" type="success" @click="checkProductDetail">查看页面</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'release',
    created () {
        if (this.$route.name === 'edict') {
            this.getProductDetail();
        }
    },
    data () {
        var validateDetails = (rule, value, callback) => {
            value.forEach(function (item) {
                if (item.label.replace(' ', '') === '' || item.value.replace(' ', '') === '') {
                    callback(new Error('细节描述不能为空'));
                }
            });
            callback();
        };
        return {
            edict: false,
            releaseId: null,
            dialogSuccess: false,
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
                price: 10,
                occasion: [],
                currency: '$',
                details: [/* formmat
                    {
                        label: 'Collection',
                        value: 'Stationery &amp; Gift Products'
                    },
                    {
                        label: 'Dimensions',
                        value: 'Stationery &amp; Gift Products'
                    } */
                ]
            },
            rules: {
                picture: [
                    { type: 'array', required: true, message: '请上传产品图片', trigger: 'blur' }
                ],
                title: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
                ],
                sku: [
                    { required: true, message: '请输入库存', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                occasion: [
                    { type: 'array', required: true, message: '请选择类别', trigger: 'blur' }
                ],
                details: [
                    { type: 'array', required: true, message: '请添加产品细节', trigger: 'blur' },
                    {validator: validateDetails, trigger: 'blur'}
                ],
                description: [
                    { required: true, message: '请输入描述', trigger: 'blur' },
                    { min: 3, max: 500, message: '长度在 3 到 500 个字符', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '请输入价格', trigger: 'blur' },
                    { type: 'number', message: '价格只能是数字', trigger: 'blur' }
                ]
            }
        };
    },
    watch: {
        '$route' (to, from) {
            if (this.$route.name !== 'edict') {
                this.edict = false;
                this.$refs['ruleForm'].resetFields();
            } else {
                this.edict = true;
                this.getProductDetail();
            }
        }
    },
    computed: {
        fileList: function () {
            return this.form.picture.map(picture => {
                return {
                    name: picture,
                    url: this.Api.picture + picture
                };
            });
        }
    },
    methods: {
        continueEdict () {
            /**
             * click to continue edict product
             */
            this.dialogSuccess = false;
            if (!this.edict) {
                this.$router.push({name: 'edict', params: {id: this.releaseId}});
            }
        },
        releaseNews () {
            /**
             * click to release new product
             */
            this.dialogSuccess = false;
            if (this.edict) {
                this.$router.push({name: 'release'});
            }
        },
        getProductDetail () {
            /**
             * edict product info by _id
             */

            this.releaseId = this.$route.params.id;
            this.edict = true;
            this.$axios.get(this.Api.product + this.releaseId).then(res => {
                this.form = res.data;
            }).catch(function (e) {
                console.error(e);
            });
        },
        beforeUpload (file) {
            /**
             * valudate file before update
             * @file {object}
             */
            console.log('file', file);
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
            /**
             * add images id to form.picture
             * @response {object} form http server
             */
            this.form.picture.push(response._id);
            this.$refs['ruleForm'].validateField('picture');
        },
        handleRemove (file, fileList) {
            /**
             * remove pitcture then validate form
             * @file {object} remove file
             * @fileList {array} flie list
             */
            console.log('file', file);
            const _id = file.response ? file.response._id : file.name;
            this.$axios.delete(this.Api.picture + _id)
                .then(res => {
                    this.form.picture = this.form.picture.filter(function (value) {
                        return value !== _id;
                    });
                    this.$refs['ruleForm'].validateField('picture');
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
        releaseProduct (formName) {
            console.log(this.form);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post(this.Api.product, this.form)
                        .then(res => {
                            this.dialogSuccess = true;
                            this.releaseId = res.data._id;
                            this.$refs[formName].resetFields();
                        })
                        .catch(function () {
                            console.info('release fail');
                        });
                }
            });
        },
        updateProduct (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.put(this.Api.product, this.form)
                        .then(res => {
                            this.dialogSuccess = true;
                        })
                        .catch(function () {
                            console.info('release fail');
                        });
                }
            });
        },
        checkProductDetail () {
            /**
             * click jump to check release product
             */
            window.open(this.Api.productDetail + this.releaseId);
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

    .icon-dialog{
        color: #67C23A;
        font-size: 60px;
        text-align: center;
        margin: 4px auto;
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
