import { createState } from 'ags'
import { Gtk } from 'ags/gtk4'
import { exec } from 'ags/process'

const [hovered, setHovered] = createState(false)

function PowerOffButton() {
  return (
    <Gtk.Box
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={['panel', 'poweroff-button']}
    >
      <Gtk.GestureClick onPressed={turnOffPc} />
      <Gtk.EventControllerMotion
        onEnter={() => setHovered(true)}
        onLeave={() => setHovered(false)}
      />

      <Gtk.Image iconName={'power-button'} />
      <Gtk.Revealer
        transitionDuration={150}
        revealChild={hovered}
        transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
      >
        <Gtk.Label label=' Poweroff' />
      </Gtk.Revealer>
    </Gtk.Box>
  )
}

function turnOffPc() {
  exec("bash -c 'systemctl poweroff'")
}

export default PowerOffButton
