import Battery from './Battery'
import KeyboardLanguage from './KeyboardLanguage'
import Wifi from './Wifi'

function LWBPanel() {
  return (
    <box
      spacing={8}
      cssClasses={['container']}
    >
      <KeyboardLanguage />
      <Wifi />
      <Battery />
    </box>
  )
}

export default LWBPanel
