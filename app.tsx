import app from 'ags/gtk4/app'
import styles from './style.scss'
import AppLauncher from './widgets/applauncher/AppLauncher'
import Bar, { BAR_WINDOW_NAME } from './widgets/bar/Bar'
import PowerOffMenu, {} from './widgets/power-off-menu/PowerOffMenu'
import WifiChooser, {} from './widgets/wifi-chooser/WifiChooser'

app.connect('window-toggled', (_, toggledWindow) => {
  for (const window of app.get_windows()) {
    if (toggledWindow.name == window?.name || window.name == BAR_WINDOW_NAME) {
      return
    }
    window.hide()
  }
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
