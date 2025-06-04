import { exec, Variable } from 'astal'
import { Gtk } from 'astal/gtk4'

const shouldPowerOffLabelBeRevealed = Variable(false)

function PowerOffButton() {
  return (
    <box
      cssClasses={['container', 'poweroff']}
      onButtonPressed={turnOffPc}
      onHoverEnter={revealChild}
      onHoverLeave={hideChild}
    >
      <image iconName={'power-button'} />
      <revealer
        transitionDuration={150}
        revealChild={shouldPowerOffLabelBeRevealed()}
        transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
      >
        <label label=' poweroff' />
      </revealer>
    </box>
  )
}

function turnOffPc() {
  exec("bash -c 'systemctl poweroff'")
}

function revealChild() {
  shouldPowerOffLabelBeRevealed.set(true)
}

function hideChild() {
  shouldPowerOffLabelBeRevealed.set(false)
}

export default PowerOffButton
