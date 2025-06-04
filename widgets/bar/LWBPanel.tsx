import { Gtk } from 'astal/gtk4'
import BatteryPanel from './BatteryPanel'
import KeyboardLanguagePanel from './KeyboardLanguagePanel'
import WifiPanel from './WifiPanel'
import { combiningPanelSpacing } from './consts'

function LWBPanel() {
  return (
    <box
      spacing={combiningPanelSpacing}
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
    >
      <box cssClasses={['container', 'leftmost-element']}>
        <KeyboardLanguagePanel isSeparate={false} />
      </box>
      <box cssClasses={['container', 'middle-element']}>
        <WifiPanel isSeparate={false} />
      </box>
      <box cssClasses={['container', 'rightmost-element']}>
        <BatteryPanel isSeparate={false} />
      </box>
    </box>
  )
}

export default LWBPanel
