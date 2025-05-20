import { App } from 'astal/gtk4'
import { styles } from './styles'
import Bar from './widgets/bar/Bar'

App.add_icons('/home/mgik/.config/ags/icons')
App.start({
  css: styles,
  main() {
    App.get_monitors().map(Bar)
  },
})
