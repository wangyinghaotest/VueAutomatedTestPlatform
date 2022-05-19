<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 性能测试项目
                </el-breadcrumb-item>
                <el-breadcrumb-item>性能测试项目</el-breadcrumb-item>
                <el-breadcrumb-item>性能测试脚本</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :model="performanceScriptData" :rules="rules" ref="PerformanceScriptFormRef">
            <el-form-item label="性能脚本名称" prop="performance_script_name" style="padding-right:0px;">
                <el-input v-model="performanceScriptData.performance_script_name" autocomplete="off" style="width: 232px;margin-left: 26px;"></el-input>
            </el-form-item>

            <el-form-item label="线程数" style="padding-right:0px;" prop="performance_threads">
                <el-input v-model="performanceScriptData.performance_threads" autocomplete="off" style="width: 232px;margin-left: 69px;"
                ></el-input>
            </el-form-item>
            <el-form-item label="Ramp-Up时间(秒)" style="padding-right: 0px;" prop="performance_ramp_up_time_seconds">
                <el-input
                    v-model="performanceScriptData.performance_ramp_up_time_seconds"
                    style="width: 232px;"
                ></el-input>
            </el-form-item>
            <el-form-item label="参数化" style="padding-right: 0px;" prop="data_set">
                <el-switch
                    v-model="data_set"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="true"
                    inactive-value="false"
                    @change="data_set_switch($event,data_set)"
                >
                </el-switch>
            </el-form-item>
            <el-form-item label="参数化文件" style="padding-right: 0px;">
                <el-upload
                    :disabled= "data_set === 'false' ? true : false"
                    :action="UploadDataUrl()"
                    list-type="text"
                    ref="my-upload"
                    :on-preview="handleDataPreview"
                    :on-remove="handleDataRemove"
                    :before-remove="beforeDataRemove"
                    :multiple="false"
                    :on-exceed="handleDataExceed"
                    :file-list="fileDataList"
                    :on-change="handleDataChange"
                    accept=".txt,.csv"
                    :show-file-list="true"
                    :on-success="onDataSuccess"
                    :on-error="onDataError"
                    class="upload_jmx"
                >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传 txt/csv 文件</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="循环次数-永远" style="padding-right: 0px;" prop="loop_count_forever">
                <el-switch
                    v-model="loop_count_forever"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="true"
                    inactive-value="false"
                    @change="loop_count_forever_switch($event,loop_count_forever)"
                >
                </el-switch>
            </el-form-item>
            <el-form-item label="循环次数" style="padding-right: 0px;" prop="performance_loop_count">
                <el-input
                    v-model="performanceScriptData.performance_loop_count"
                    :disabled= "loop_count_forever === 'true' ? true : false"
                    style="width: 232px;left: 54px;"
                ></el-input>
            </el-form-item>
            <el-form-item label="是否开启调度器" style="padding-right: 0px;" prop="performance_scheduler">
                <!--                        <el-input v-model="addPerformanceScriptData.performance_scheduler" style="width: 232px;" @input="change($event)"></el-input>-->
                <el-switch
                    v-model="performance_scheduler"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="true"
                    inactive-value="false"
                    @change="scheduler_switch($event,performance_scheduler)"
                >
                </el-switch>
            </el-form-item>
            <el-form-item label="持续时间" style="padding-right: 0px;" prop="performance_duration">
                <el-input
                    v-model="performanceScriptData.performance_duration"
                    :disabled= "performance_scheduler === 'false' ? true : false"
                    style="width: 232px;left: 54px;"
                    @input="change($event)"
                ></el-input>
            </el-form-item>
        </el-form>
        <el-upload
            display='none'
            :action="UploadUrl()"
            list-type="text"
            ref="my-upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :multiple="false"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :on-change="handleChange"
            accept=".jmx"
            :show-file-list="true"
            :on-success="onSuccess"
            :on-error="onError"
            class="upload_jmx"
        >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jmx文件，且不超过500kb</div>
        </el-upload>

        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="downloadPerformanceScript">下 载</el-button>
            <el-button @click="scriptCancel">取 消</el-button>
            <el-button type="primary" @click="savePerformanceScript">确 定</el-button>
        </div>
    </div>

</template>

<script>
import { fileUrl } from '../../../../api/common/common';
import {
    addPerformanceScriptRequest,
    getSinglePerformanceScriptRequest,
    updateSinglePerformanceScriptRequest
} from '../../../../api/performance/performanceScript';
export default {
    name: 'addOrEditPerformanceProjectScript',
    props:['type','performanceScriptProjectId', 'performanceScriptId', 'scriptData'],
    data() {
        return {
            fileList: [{}],
            fileDataList: [{}],

            performance_scheduler:"",
            data_set: "",
            loop_count_forever: "",
            performanceScriptData: {
                performance_script_name: '',
                performance_project_id: '',
                performance_script: '',
                performance_data_script: '',
                performance_threads:'',
                performance_ramp_up_time_seconds:'',
                performance_loop_count:'',
                performance_duration:'',
                performance_script_id:''
            },
            rules: {
                performance_script_name: [{ required: true, message: '请输入脚本名称', trigger: 'blur' }],
                performance_threads: [{ required: true, message: '请输入线程数', trigger: 'blur' }],
                performance_ramp_up_time_seconds: [{ required: true, message: '请输入时间', trigger: 'blur' }],

            }

        };
    },
    mounted() {

    },
    methods:{
        scheduler_switch(performance_scheduler){
            console.log(performance_scheduler)

        },

        data_set_switch(data_set){
            console.log(data_set)

        },
        change(e) {
            this.$forceUpdate()
        },
        loop_count_forever_switch(loop_count_forever){
            console.log(loop_count_forever)

        },
        onSuccess(res) {
            this.$alert(res.data.result, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                    console.log('上传成功');
                }
            });
            this.performanceScriptData.performance_script = res.data.file;
        },
        onDataSuccess(res) {
            this.$alert(res.data.result, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                    console.log('上传成功');
                }
            });
            this.performanceScriptData.performance_data_script = res.data.file;
        },
        UploadUrl() {
            return fileUrl + 'api/backend/performance_test/performance_script_upload/';
        },
        UploadDataUrl() {
            return fileUrl + 'api/backend/performance_test/performance_script_data_set_upload/';
        },
        handlePreview(file) {
            console.log(file);
        },
        handleDataPreview(file){
          console.log(file)
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handleDataRemove(file, fileDataList) {
            console.log(file, fileDataList);
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        handleDataExceed(files, fileDataList) {
            this.$message.warning(
                `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileDataList.length} 个文件`
            );
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        beforeDataRemove(file, fileDataList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        handleChange(file, fileList) {
            if (fileList.length > 0) {
                this.fileList = [fileList[fileList.length - 1]]; // 这一步，是 展示最后一次选择的jmx文件
            }
        },
        handleDataChange(file, fileDataList) {
            if (fileDataList.length > 0) {
                this.fileDataList = [fileDataList[fileDataList.length - 1]]; // 这一步，是 展示最后一次选择的jmx文件
            }
        },
        onError(res) {
            console.log('失败的回调' + JSON.stringify(res));
            this.$alert('创建失败', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                    console.log('上传失败');
                }
            });
        },
        onDataError(res) {
            console.log('失败的回调' + JSON.stringify(res));
            this.$alert('创建失败', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                    console.log('上传失败');
                }
            });
        },
        // 编辑弹框--下载jmeter脚本
        downloadPerformanceScript() {
            console.log(this.fileList[0].url);

            window.location.href = this.fileList[0].url;
        },
        scriptCancel() {
            this.performance_scheduler = "";
            this.$parent.cancelPerformanceScript();
            this.$refs['my-upload'].clearFiles();
        },

        savePerformanceScript() {
            if ('add' === this.type){
                this.addPerformanceScript()
            }else {
                this.editPerformanceScript()
            }
        },

        // 添加性能脚本
        addPerformanceScript(){
            let req = JSON.parse(JSON.stringify(this.performanceScriptData));
            req.performance_scheduler = this.performance_scheduler
            req.loop_count_forever = this.loop_count_forever
            req.performance_data_script = this.performanceScriptData.performance_data_script
            req.data_set = this.data_set

            this.$refs.PerformanceScriptFormRef.validate(valid => {
                if (valid) {
                    // 代表校验通过
                    addPerformanceScriptRequest(req).then(data => {
                        if (true === data.data.success) {
                            this.$message.success('创建性能脚本成功');
                            this.$parent.savePerformanceScript();
                        } else {
                            this.$message.error('创建性能脚本失败');
                        }
                    });
                } else {
                    //校验失败
                    return false;
                }
            });
        },

        // 编辑性能脚本
        editPerformanceScript(){
            let req = JSON.parse(JSON.stringify(this.performanceScriptData));
            req.performance_scheduler = this.performance_scheduler
            req.loop_count_forever = this.loop_count_forever
            req.performance_script = this.performanceScriptData.performance_script
            req.performance_data_script = this.performanceScriptData.performance_data_script
            req.data_set = this.data_set

            this.$refs.PerformanceScriptFormRef.validate(valid => {
                if (valid) {
                    // 代表校验通过
                    updateSinglePerformanceScriptRequest(this.performanceScriptData.performance_script_id, req).then(data => {
                        console.log(data);
                        if (true === data.data.success) {
                            this.$message.success('编辑性能脚本成功');
                            this.$parent.savePerformanceScript();
                        } else {
                            this.$message.error('编辑性能脚本失败');
                        }
                    });
                } else {
                    //校验失败
                    return false;
                }
            });
        },

        //获取单个脚本信息
        editPerformanceScriptPopup() {
            // 获取单个脚本信息
            getSinglePerformanceScriptRequest( this.performanceScriptData.performance_script_id).then(data => {

                if (true === data.data.success) {
                    let performance_script_data = data.data.data;
                    this.performanceScriptData = {...performance_script_data }
                    this.loop_count_forever = data.data.data.loop_count_forever
                    this.performance_scheduler = data.data.data.performance_scheduler
                    this.fileList = data.data.data.performance_script_url;
                    this.performanceScriptData.performance_script = performance_script_data.performance_script_url[0].url;
                    this.fileDataList= data.data.data.performance_script_data_url;
                    this.performanceScriptData.performance_data_script = performance_script_data.performance_script_data_url[0].url;
                    this.data_set = performance_script_data.data_set
                } else {
                    this.$message.error('获取接口失败');
                }
            });
        },


    },

    components: {},

    created() {
        if ('edit'===this.type){
            this.performanceScriptData.performance_project_id = this.performanceScriptProjectId
            this.performanceScriptData.performance_script_id = this.performanceScriptId
            this.editPerformanceScriptPopup()

        }

        if ('add'===this.type){
            this.performanceScriptData.performance_project_id = this.performanceScriptProjectId
        }

    },

};
</script>

<style scoped>
.upload_jmx{
    width: 200px;
}
/deep/.el-upload.el-upload--text{
    width: 82px !important;
    height: 32px !important;
}
/*去除upload组件过渡效果*/
::v-deep .el-upload-list__item {
    transition: none !important;
}
</style>