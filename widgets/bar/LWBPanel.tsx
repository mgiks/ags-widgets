import BatteryPanel from './BatteryPanel'
import KeyboardLanguagePanel from './KeyboardLanguagePanel'
import WifiPanel from './WifiPanel'

function LWBPanel() {
  return (
    <box
      spacing={8}
      cssClasses={['container']}
    >
      <KeyboardLanguagePanel isSeparate={false} />
      <WifiPanel isSeparate={false} />
      <BatteryPanel isSeparate={false} />
    </box>
  )
}

export default LWBPanel
