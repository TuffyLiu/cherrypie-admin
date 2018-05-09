<!--
    @file:顶部菜单
-->
<template>
    <div id="menu">
        <el-tree
            :data="data"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :highlight-current="true"
            draggable>
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                    <el-button type="text" icon="el-icon-delete" @click="dialogDelete = true"></el-button>
                    <el-button type="text" icon="el-icon-edit" @click="dialogEdit = true"></el-button>
                    <el-button type="text" icon="el-icon-plus" @click="dialogPlus = true"></el-button>
                </span>
            </span>
        </el-tree>
        <el-dialog
          title="删除提示"
          :visible.sync="dialogDelete"
          width="30%">
          <span>您将删除一条菜单</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogDelete = false">取 消</el-button>
            <el-button type="primary" @click="dialogDelete = false">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="菜单编辑框"
          :visible.sync="dialogEdit"
          width="30%">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="菜单名">
                    <el-input v-model="form.label"></el-input>
                </el-form-item>
                <el-form-item label="菜单链接">
                    <el-input v-model="form.href"></el-input>
                </el-form-item>
            </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogEdit = false">取 消</el-button>
            <el-button type="primary" @click="dialogEdit = false">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="菜单添加框"
          :visible.sync="dialogPlus"
          width="30%">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="菜单名">
                    <el-input v-model="form.label"></el-input>
                </el-form-item>
                <el-form-item label="菜单链接">
                    <el-input v-model="form.href"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogPlus = false">取 消</el-button>
                <el-button type="primary" @click="dialogPlus = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'menu',
    data () {
        return {
            form: {
                label: '',
                href: ''
            },
            dialogDelete: false,
            dialogEdit: false,
            dialogPlus: false,
            data: [
                {
                    id: 1,
                    label: 'New',
                    href: '/category',
                    children: [
                        {
                            id: 11,
                            label: 'left1',
                            children: [
                                {
                                    id: 111,
                                    label: 'Letterpress Journals',
                                    href: '/category'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    label: 'LETTERPRESS CARDS & GOODS',
                    href: '/category',
                    children: [
                        {
                            id: 21,
                            label: 'left1',
                            children: [
                                {
                                    id: 211,
                                    label: 'Greeting Cards',
                                    href: '/category'
                                },
                                {
                                    id: 212,
                                    label: 'Letterpress Journals',
                                    href: '/category'
                                },
                                {
                                    id: 212,
                                    label: 'Bijou Collection',
                                    href: '/category'
                                },
                                {
                                    id: 212,
                                    label: 'Greeting Cards',
                                    href: '/category'
                                }
                            ]
                        },
                        {
                            id: 22,
                            label: 'left2',
                            children: [
                                {
                                    id: 221,
                                    label: 'Letterpress Journals',
                                    href: '/category'
                                },
                                {
                                    id: 222,
                                    label: 'Greeting Cards',
                                    href: '/category'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #menu{
        padding: 10px;
    }
    .custom-tree-node .el-button{
        display: none;
    }
    .el-tree-node__content:hover .el-button{
        display: inline-block;
    }
</style>
