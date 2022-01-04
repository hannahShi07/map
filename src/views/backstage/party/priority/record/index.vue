<template>
  <keep-alive>
    <component :is="currentComponent" :params="params" :type="type" @handleSwitch="handleSwitch"></component>
  </keep-alive>
</template>

<script>
    import Index from './components/index'
    import RecordEdit from './components/record-edit'
    import RecordNonEdit from './components/record-nonedit'
    import RecordDetail from './components/record-detail'
    import RecordNonDetail from './components/record-nondetail'
    import awardsIndex from '../awards/components/index'
    import ProDouAdd from '../awards/components/pro-dou-add'
    import prosocialAdd from '../awards/components/prosocial-add'
    import socialOrgAdd from '../awards/components/socialOrg-add'
    import socialNonAdd from '../awards/components/socialNon-add'
    import socialNonDetail from '../awards/components/socialNon-detail'
    import socialOrgDetail from '../awards/components/socialOrg-detail'
    import prosocialDetail from '../awards/components/prosocial-detail'
    import ProDouDetail from '../awards/components/pro-dou-detail'

    export default {
        components:
            {Index,RecordEdit,RecordNonEdit,RecordDetail,RecordNonDetail,awardsIndex,socialNonDetail,socialOrgDetail,prosocialDetail,ProDouDetail,ProDouAdd,prosocialAdd,socialOrgAdd,socialNonAdd},
        watch:{
            $route(to,from){
                if(to){
                    this.currentComponent = 'Index'
                }
            }
        },
        beforeRouteLeave(to,from,next){
            sessionStorage.removeItem('actIndx')
            next()
        },
        data () {
            return {
                currentComponent: 'Index',
                params: {},
                type:{}
            }
        },
        created () {
            this.currentComponent = 'Index'
        },
        methods: {
            handleSwitch ({name, params = {},type}) {
                this.currentComponent = name
                this.params = params
                this.type = type

            }
        }
    }
</script>
