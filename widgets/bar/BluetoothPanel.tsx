import Bluetooth from 'gi://AstalBluetooth'
import { Gtk } from 'ags/gtk4'
import { createBinding, createComputed } from 'ags'

function BluetoothPanel() {
  const bluetooth = Bluetooth.get_default()

  const connected = createBinding(bluetooth, 'isConnected')

  const deviceName = createComputed([connected], () => {
    for (const device of bluetooth.get_devices()) {
      if (device.connected) {
        return device.name + ' ' + (device.batteryPercentage * 100).toString() +
          '%'
      }
    }
    return ''
  })

  return (
    <box
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={['panel']}
    >
      <box spacing={3}>
        <image
          icon_name={deviceName.as((devicName) =>
            devicName ? 'bluetooth-connected' : 'bluetooth-disconnected-custom'
          )}
        />
        <label
          visible={deviceName.as((deviceName) => deviceName.length > 0)}
          label={deviceName}
        />
      </box>
    </box>
  )
}

export default BluetoothPanel
