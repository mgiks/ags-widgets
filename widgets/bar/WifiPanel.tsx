import { createBinding } from 'ags'
import Network from 'gi://AstalNetwork'
import Gtk from 'gi://Gtk?version=4.0'

function WifiPanel() {
  const network = Network.get_default()
  const wifi = createBinding(network, 'wifi')
  const ssid = wifi.as((wifi) => wifi.ssid)
  const iconName = wifi.as((wifi) => {
    return wifi.iconName.replace('symbolic', 'custom')
  })

  return (
    <Gtk.Box
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={['panel']}
    >
      <Gtk.Box spacing={3}>
        <Gtk.Image iconName={iconName} />
        <Gtk.Label label={ssid} />
      </Gtk.Box>
    </Gtk.Box>
  )
}

export default WifiPanel
