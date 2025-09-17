import { Accessor, createBinding } from 'ags'
import Network from 'gi://AstalNetwork'
import Gtk from 'gi://Gtk?version=4.0'

function WifiPanel() {
  const network: Network.Network = Network.get_default()
  const wifi = createBinding(network, 'wifi')

  const ssid = createBinding(
    network.wifi,
    'ssid',
  )

  const iconName = createBinding(network.wifi, 'iconName')

  return (
    <box
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={['panel']}
    >
      <box spacing={3}>
        {wifi.get() && ssid.get()
          ? (
            <>
              <image
                iconName={iconName.as((iconName) =>
                  iconName.replace('symbolic', 'custom')
                )}
              />
              <label label={ssid} />
            </>
          )
          : <image icon_name={'network-wireless-disabled-custom'} />}
      </box>
    </box>
  )
}

export default WifiPanel
