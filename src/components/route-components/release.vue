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
            <el-button type="primary" @click.prevent="releaseProduct('ruleForm')">发布</el-button>
        </el-form>
        <el-dialog
              title="发布成功"
              :visible.sync="dialogSuccess"
              width="30%"
              center>
              <p class="icon-dialog"><i class="el-icon-success"></i></p>
              <span slot="footer" class="dialog-footer">
                <el-button  type="primary" @click="dialogSuccess = false">继续发布</el-button>
                <el-button type="success" @click="checkProductDetail">产品页面</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'release',
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
            dialogSuccess: true,
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
    methods: {
        beforeUpload (file) {
            /**
             * valudate file before update
             * @file {object}
             */
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
            const self = this;
            self.$axios.delete(self.Api.picture + file.response._id)
                .then(function (res) {
                    self.form.picture = self.form.picture.filter(function (value) {
                        console.log(value === file.response._id);
                        return value !== file.response._id;
                    });
                    self.$refs['ruleForm'].validateField('picture');
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
                    const self = this;
                    self.$axios.post(self.Api.product, self.form)
                        .then(function (res) {
                            self.dialogSuccess = true;
                            console.info('release sucess');
                        })
                        .catch(function () {
                            console.info('release fail');
                        });
                }
            });
        },
        checkProductDetail () {

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
