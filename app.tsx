import app from 'ags/gtk4/app'
import styles from './style.scss'
import AppLauncher from './widgets/applauncher/AppLauncher'
import Bar from './widgets/bar/Bar'

app.add_icons('/home/mgik/.config/ags/icons')
app.start({
  css: styles,
  main() {
    app.get_monitors().map((monitor) => {
      <>
        <AppLauncher gdkmonitor={monitor} />
        <Bar gdkmonitor={monitor} />
      </>
    })
  },
})
