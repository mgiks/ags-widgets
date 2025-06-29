import { createState } from 'ags'
import { Gtk } from 'ags/gtk4'
import { exec } from 'ags/process'

const [hovered, setHovered] = createState(false)

function PowerOffButton() {
  return (
    <box
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={['panel', 'poweroff-button']}
    >
      <Gtk.GestureClick onPressed={turnOffPc} />
      <Gtk.EventControllerMotion
        onEnter={() => setHovered(true)}
        onLeave={() => setHovered(false)}
      />

      <image iconName={'power-button'} />
      <revealer
        transitionDuration={150}
        revealChild={hovered}
        transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
      >
        <label label=' Poweroff' />
      </revealer>
    </box>
  )
}

function turnOffPc() {
  exec("bash -c 'systemctl poweroff'")
}

export default PowerOffButton
