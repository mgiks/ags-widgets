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
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      keymode={Astal.Keymode.EXCLUSIVE}
      resizable={false}
    >
      <Gtk.EventControllerKey
        onKeyPressed={({ widget }, keyval) => {
          switch (keyval) {
            case (Gdk.KEY_Escape):
              widget.hide()
              break
            case (Gdk.KEY_j):
              widget.child_focus(Gtk.DirectionType.TAB_FORWARD)
              break
            case (Gdk.KEY_k):
              widget.child_focus(Gtk.DirectionType.TAB_BACKWARD)
              break
          }
        }}
      />
      <box cssClasses={['power-off-menu']}>
        <box orientation={Gtk.Orientation.VERTICAL}>
          <box
            orientation={Gtk.Orientation.HORIZONTAL}
          >
            <button
              onClicked={() => turnOffPc()}
              cssClasses={['power-off-menu__button']}
            >
              <box>
                <box cssClasses={['power-off-menu__icon']}>
                  <image iconName='power-off' />
                </box>
                <label label={'Shutdown'} />
              </box>
            </button>
          </box>
          <box orientation={Gtk.Orientation.HORIZONTAL}>
            <button
              onClicked={() => rebootPc()}
              cssClasses={['power-off-menu__button']}
            >
              <box>
                <box cssClasses={['power-off-menu__icon']}>
                  <image iconName='reboot' />
                </box>
                <label label={'Restart'} />
              </box>
            </button>
          </box>
        </box>
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
