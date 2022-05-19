<template>
    <div>
        <el-dialog title="创建项目" :visible.sync="addProjectdialogFormVisible">
            <el-form :model="addProjectData" :rules="rules" ref="addProjectFormRef">
                <el-form-item label="项目名称" label-width="100px" prop="ui_project_name">
                    <el-input v-model="addProjectData.ui_project_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目描述" label-width="100px" prop="describe">
                    <el-input type="textarea" v-model="addProjectData.describe" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addProjectdialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addProject">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import { addUiProjectRequest } from '../../../../api/uiAutomation/uiProject';

export default {
    name: 'AddProject',
    components: {
        // editor: require('vue2-ace-editor'),
    },

    data() {
        return {
            addProjectdialogFormVisible: true,

            addProjectData: {
                ui_project_name: "",
                describe: ""
            },

            rules: {
                ui_project_name: [
                    {required: true, message: '请输入名称', trigger: 'blur'},
                ],
                description: [
                    {required: true, message: '请输入描述', trigger: 'blur'},
                ],
            },


            content: "",

        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },


        addProject() {
            let req = JSON.parse(JSON.stringify(this.addProjectData));

            this.$refs.addProjectFormRef.validate((valid) => {
                if (valid) { // 代表校验通过
                    addUiProjectRequest(req).then(data => {
                        console.log(data)
                        if (true === data.data.success) {
                            this.getUiProjectFun();
                            this.addProjectdialogFormVisible = false;
                            this.$message.success("创建项目成功")
                        } else {
                            this.$message.error("创建项目失败")
                        }
                    })
                } else {  //校验失败
                    return false;
                }
            });
        },






    },
};
</script>

<style scoped>
.ops-class{
    margin-bottom: 10px;
}
</style>