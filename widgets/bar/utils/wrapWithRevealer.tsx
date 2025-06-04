import { timeout } from 'astal'
import { Gtk } from 'astal/gtk4'

const animation = Gtk.RevealerTransitionType.SLIDE_RIGHT
const revealerTimeout = 500

export function wrapWithRevealer(element: Gtk.Widget) {
  return (
    <revealer
      setup={(self) => timeout(revealerTimeout, () => self.revealChild = true)}
      transitionType={animation}
    >
      {element}
    </revealer>
  )
}
