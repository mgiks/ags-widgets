import { createState } from 'ags'
import { monitorFile, readFileAsync } from 'ags/file'
import { Gtk } from 'ags/gtk4'
import GLib from 'gi://GLib?version=2.0'

const touchpadStatus = {
  on: 'touchpad-on',
  off: 'touchpad-off',
}

const [touchpadStatusIcon, setTouchpadStatusIcon] = createState(
  touchpadStatus.on,
)
const touchpadStatusFile = GLib.getenv('XDG_RUNTIME_DIR') + '/' +
  'touchpad.status'

function TouchpadStatusPanel() {
  updateTouchpadStatus()
  monitorFile(touchpadStatusFile, updateTouchpadStatus)

  return (
    <box cssClasses={['panel']}>
      <image icon_size={Gtk.IconSize.NORMAL} icon_name={touchpadStatusIcon} />
    </box>
  )
}

async function updateTouchpadStatus() {
  const isTouchpadOn = await readFileAsync(touchpadStatusFile)

  if (isTouchpadOn === 'false') {
    setTouchpadStatusIcon(touchpadStatus.off)
  } else {
    setTouchpadStatusIcon(touchpadStatus.on)
  }
}

export default TouchpadStatusPanel
