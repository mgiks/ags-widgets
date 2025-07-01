import { createBinding } from 'ags'
import Network from 'gi://AstalNetwork'
import Gtk from 'gi://Gtk?version=4.0'

function WifiPanel() {
  const network = Network.get_default()
  const wifi = createBinding(network, 'wifi')
  const ssid = createBinding(network.wifi, 'ssid')
  const iconName = wifi.as((wifi) => {
    return wifi.iconName.replace('symbolic', 'custom')
  })

  return (
    <box
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={['panel']}
    >
      <box spacing={3}>
        <image iconName={iconName} />
        <label label={ssid} />
      </box>
    </box>
  )
}

export default WifiPanel
