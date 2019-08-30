// muse ui
import Vue from 'vue'
import {
  Button,
  Grid,
  DateInput,
  Tooltip,
  DataTable,
  Dialog,
  Icon,
  Checkbox,
  Radio,
  Snackbar,
  Tabs,
  Chip,
  LoadMore,
  List,
  Progress,
  Paper,
  Avatar,
  Divider
} from 'muse-ui'
import 'muse-ui/lib/styles/base.less'
import 'muse-ui/lib/styles/theme.less'
import '@/assets/styles/style.scss'
import theme from 'muse-ui/lib/theme';
import Helpers from 'muse-ui/lib/Helpers'

import '@/components/loading/muse-ui-loading/loading.less'
import Loading from '@/components/loading/muse-ui-loading'

Vue.use(Loading, {
  overlayColor: 'rgba(0, 0, 0, 0.1)'
})
theme.use('light')

Vue.use(Helpers)
Vue.use(Button)
Vue.use(Tooltip)
Vue.use(DateInput)
Vue.use(DataTable)
Vue.use(Grid)
Vue.use(Dialog)
Vue.use(Icon)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(Snackbar)
Vue.use(Tabs)
Vue.use(Chip)
Vue.use(LoadMore)
Vue.use(List)
Vue.use(Progress)
Vue.use(Paper)
Vue.use(Avatar)
Vue.use(Divider)