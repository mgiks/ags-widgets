import { Accessor, createState } from 'ags'
import { Astal, Gdk, Gtk } from 'ags/gtk4'
import app from 'ags/gtk4/app'
import { exec } from 'ags/process'

export const POWER_OFF_MENU_WINDOW_NAME = 'power-off-menu'

export default function PowerOffMenu(
  { gdkmonitor }: { gdkmonitor: Gdk.Monitor },
) {
  const [powerOffType, setPowerOffType] = createState('Shutdown')
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor

  return (
    <window
      name={POWER_OFF_MENU_WINDOW_NAME}
      cssClasses={['widget']}
      anchor={TOP | LEFT | RIGHT | BOTTOM}
      gdkmonitor={gdkmonitor}
      application={app}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      keymode={Astal.Keymode.EXCLUSIVE}
      resizable={true}
    >
      <Gtk.EventControllerKey
        onKeyPressed={({ widget }, keyval) => {
          switch (keyval) {
            case (Gdk.KEY_Escape):
              widget.hide()
              break
            case (Gdk.KEY_h):
            case (Gdk.KEY_j):
              widget.child_focus(Gtk.DirectionType.TAB_FORWARD)
              break
            case (Gdk.KEY_l):
            case (Gdk.KEY_k):
              widget.child_focus(Gtk.DirectionType.TAB_BACKWARD)
              break
          }
        }}
      />
      <box
        cssClasses={['power-off-menu']}
        orientation={Gtk.Orientation.VERTICAL}
      >
        <box
          orientation={Gtk.Orientation.VERTICAL}
          halign={Gtk.Align.CENTER}
          valign={Gtk.Align.CENTER}
          hexpand={true}
          vexpand={true}
        >
          <label
            cssClasses={['power-off-menu__label']}
            label={powerOffType}
          />
          <box>
            <button
              onNotifyHasFocus={() => setPowerOffType('Shutdown')}
              valign={Gtk.Align.CENTER}
              onClicked={() => turnOffPc()}
              cssClasses={['power-off-menu__button']}
            >
              <image iconName='power-off' />
            </button>
            <button
              onNotifyHasFocus={() => setPowerOffType('Reboot')}
              valign={Gtk.Align.CENTER}
              onClicked={() => rebootPc()}
              cssClasses={['power-off-menu__button']}
            >
              <image iconName='reboot' />
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
