import { Accessor } from 'ags'
import { Astal, Gdk, Gtk } from 'ags/gtk4'
import app from 'ags/gtk4/app'
import { exec } from 'ags/process'

const WINDOW_NAME = 'power-off-menu'

export default function PowerOffMenu(
  { gdkmonitor }: { gdkmonitor: Gdk.Monitor },
) {
  return (
    <window
      name={WINDOW_NAME}
      cssClasses={['widget']}
      gdkmonitor={gdkmonitor}
      application={app}
      exclusivity={Astal.Exclusivity.NORMAL}
      keymode={Astal.Keymode.EXCLUSIVE}
      resizable={false}
    >
      <Gtk.EventControllerKey
        onKeyPressed={({ widget }, keyval) => {
          if (keyval == Gdk.KEY_Escape) {
            widget.hide()
          }
        }}
      />
      <box
        orientation={Gtk.Orientation.VERTICAL}
        cssClasses={['power-off-menu-label']}
      >
        <label label='Power off menu' />
      </box>
      <box
        hexpand={true}
        cssClasses={['power-off-menu']}
        orientation={Gtk.Orientation.HORIZONTAL}
      >
        <button
          onClicked={() => turnOffPc()}
          cssClasses={['power-off-menu__button']}
        >
          <image iconName='power-off'></image>
        </button>
        <button
          onClicked={() => rebootPc()}
          cssClasses={['power-off-menu__button']}
        >
          <image iconName='reboot'></image>
        </button>
      </box>
    </window>
  )
}

function turnOffPc() {
  exec("bash -c 'systemctl poweroff'")
}

function rebootPc() {
  exec("bash -c 'systemctl reboot'")
}
