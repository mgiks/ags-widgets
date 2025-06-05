import { App } from 'astal/gtk4'
import { styles } from './styles'
import Bar from './widgets/bar/Bar'
import AppLauncher from './widgets/applauncher/AppLauncher'

App.add_icons('/home/mgik/.config/ags/icons')
App.start({
  css: styles,
  main() {
    const monitors = App.get_monitors()
    for (const monitor of monitors) {
      Bar(monitor)
      AppLauncher(monitor)
    }
  },
})
