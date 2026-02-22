import app from 'ags/gtk4/app'
import styles from './style.scss'
import AppLauncher from './widgets/applauncher/AppLauncher'
import Bar, { BAR_WINDOW_NAME } from './widgets/bar/Bar'
import PowerOffMenu, {} from './widgets/power-off-menu/PowerOffMenu'
import WifiChooser, {} from './widgets/wifi-chooser/WifiChooser'

app.connect('window-toggled', (_, toggledWindow) => {
  if (!toggledWindow.is_visible()) {
    return
  }

  const windowsToIgnore = [toggledWindow.name, BAR_WINDOW_NAME]
  app.get_windows().forEach((window) => {
    if (window.is_visible() && !windowsToIgnore.includes(window.name)) {
      window.hide()
    }
  })
})

app.add_icons('/home/mgik/.config/ags/icons')
app.start({
  css: styles,
  main() {
    app.get_monitors().map((monitor) => {
      <>
        <Bar gdkmonitor={monitor} />
        <AppLauncher gdkmonitor={monitor} />
        <PowerOffMenu gdkmonitor={monitor} />
        <WifiChooser gdkmonitor={monitor} />
      </>
    })
  },
})
