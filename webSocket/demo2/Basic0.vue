<template lang="html">
    <Form label-position="top" class="basic-wrap md-top form-style-noemal">
        <Row>
            <Col span="16">
                <Row>
                    <Col span="12" class="col-item">
                        <FormItem label="项目负责人">
                            <Input v-model="formValidate.projectLeader" :readonly="true"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12" class="col-item">
                        <FormItem label="电话号码">
                            <Input v-model="formValidate.tel" :readonly="true"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12" class="col-item">
                        <FormItem label="项目地点">
                            <Input :value="formValidate.projectAdderss | filterAddress" :readonly="true"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12" class="col-item">
                        <FormItem label="项目开始时间">
                            <Input :value="formValidate.startTime | filterNormalTime('mouth', true)" :readonly="true"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12" class="col-item">
                        <FormItem label="工期">
                            <Input :value="!!formValidate.project_duration ? formValidate.project_duration + '个月' : ''" :readonly="true"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12" class="col-item">
                        <FormItem label="建设单位">
                            <Input v-model="formValidate.buildOrg" :readonly="true"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12" class="col-item">
                        <FormItem label="施工单位">
                            <Input v-model="formValidate.constructionOrg" :readonly="true"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12" class="col-item">
                        <FormItem label="监理单位">
                            <Input v-model="formValidate.supervisor" :readonly="true"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Col>
            <Col span="8" class="col-item">
                <FormItem label="预警信息">
                    <Input class="item-warning" :readonly="true" v-for="(val, key) in warnTypes" :key="key" :value="val"><Icon class="icon-warning" type="android-notifications" slot="prepend"></Icon></Input>
                </FormItem>
            </Col>
        </Row>
        <p class="readDetaild">
            <router-link :to="{name: 'PerBasic', query:{projectId} }">查看人员信息</router-link>
            <router-link :to="{name: 'AttendanceInfo', query:{projectId} }">查看考勤信息</router-link>
            <router-link :to="{name: 'PayrollInfo', query:{projectId} }">查看工资信息</router-link>
        </p>
    </Form>
</template>

<script>
    import * as Project from '@/api/Project'
    export default {
        name: 'Basic',
        data () {
            return {
                projectId: this.$route.query.projectId,
                formValidate: {
                    projectLeader: '', // 项目负责人
                    tel: '',
                    projectAdderss: '', // 项目地点
                    startTime: '', // 项目开始时间
                    project_duration: '', // 工期
                    buildOrg: '', // 建设单位
                    constructionOrg: '', // 施工单位
                    supervisor: '' // 监理单位
                },
                warnTypes: {}
            }
        },
        created () {
            this.getProjectBasicInfo(this.projectId)
        },
        methods: {
            getProjectBasicInfo (projectId) {
                if (!projectId) {
                    this.$Message.error('非法进入！')
                    return false
                }
                Project.getProjectBasicInfo({
                    data: {
                        projectId
                    }
                }).then(res => {
                    if (res.data.status === 200) {
                        let data = res.data.response
                        this.formValidate.projectLeader = data.project_leader
                        this.formValidate.tel = data.project_tel
                        this.formValidate.projectAdderss = data.project_address
                        this.formValidate.startTime = data.start_time
                        this.formValidate.buildOrg = data.tConstructionUnit
                        this.formValidate.constructionOrg = data.constructionUnit
                        this.formValidate.supervisor = data.supervisionUnit
                        this.formValidate.project_duration = data.project_duration
                        this.warnTypes = data.warnTypes
                    }
                })
            }
        },
        filters: {
            filterAddress (val) {
                return val && val.replace(/,/g, '')
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/sass/_var";

    .basic-wrap {
        padding: 0 7px 30px;
        position: relative;
    }
    .col-item {
        padding: 0 33px;
    }
    .item-warning {
        margin-bottom: 10px;
        border-radius: 4px;
        border: 1px solid $noemal-border-color;
        .icon-warning {
            color: $error;
            font-size: 26px;
        }
    }
    .readDetaild {
        text-align: right;
        z-index: 2;
        position: absolute;
        width: 100%;
        bottom: 52px;
        a {
            margin-right: 40px;
            font-size: 16px;
            @extend %a-hover;
        }
    }
</style>

<style lang="scss">
    .basic-wrap {
        .item-warning .ivu-input-group-append, .item-warning .ivu-input-group-prepend {
            border: none;
            background: none;
        }

        .item-warning .ivu-input {
            border: none;
            padding-left: 0;
        }
        .ivu-input-group-append, .ivu-input-group-prepend {
            padding-left: 10px;
            padding-right: 10px;
        }
    }
</style>
