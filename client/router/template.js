import TemplateList from '../components/template/List.vue'
import TemplateEdit from '../components/template/Edit.vue'
import UserTemplateList from '../components/template/Userlist.vue'
import UserTemplateEdit from '../components/template/Useredit.vue'
import UserTemplateValues from '../components/template/UserTemplateValues.vue'
import Corps from '../components/template/Corps.vue'
import Corplist from '../components/template/Corplist.vue'
export default [{
        path: '/admin/template',
        component: TemplateList
    },
    {
        path: '/admin/template/edit',
        component: TemplateEdit
    },
    {
        path: '/templates',
        component: UserTemplateList
    },
    {
        path: '/templates/edit',
        component: UserTemplateEdit
    },
    {
        path: '/templates/values',
        component: UserTemplateValues
    },
    {
        path: '/templates/corplist',
        component: Corplist
    },
    {
        path: '/templates/corps',
        component: Corps
    }
];