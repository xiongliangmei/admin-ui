import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh_cn',
  messages: { // 引入语言包
    'zh_cn': require('./lang/zh_cn.json'),
    'en_us': require('./lang/en_us.json')
  }
})
export default i18n
