import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ToastService from "primevue/toastservice";
import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsExample from '@/components/DocsExample'
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import DataTable from "primevue/datatable";
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';
import Tag from 'primevue/tag';
import Dialog from "primevue/dialog";
import Card from "primevue/card";
import InputNumber from "primevue/inputnumber";
import Dropdown from "primevue/dropdown";
import DataView from "primevue/dataview";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import Sidebar from "primevue/sidebar";
import Terminal from "primevue/terminal";
import TerminalService from "primevue/terminalservice";
//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";
import 'primeflex/primeflex.css';



//core
import "primevue/resources/primevue.min.css";

//icons
import "primeicons/primeicons.css";
const app = createApp(App)
app.use(store)
app.use(router)
app.use(PrimeVue);
app.use(ToastService);
app.use(CoreuiVue);
app.use(TerminalService);
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsExample', DocsExample)
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Toast', Toast);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('Tag', Tag);
app.component('Dialog', Dialog);
app.component('Card', Card);
app.component('InputNumber', InputNumber);
app.component('Dropdown', Dropdown);
app.component('DataView', DataView);
app.component('DataViewLayoutOptions', DataViewLayoutOptions);
app.component('Sidebar', Sidebar);
app.component('Terminal', Terminal);



app.mount('#app')
