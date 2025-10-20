import Bluetooth from 'gi://AstalBluetooth'
import { Gtk } from 'ags/gtk4'
import { Accessor, createBinding } from 'ags'
import { createPoll } from 'ags/time'

function findConnectedDevices(devices: Bluetooth.Device[]) {
  for (const device of devices) {
    if (device.connected) {
      return device
    }
  }
  return devices[0]
}

function BluetoothPanel() {
  const bluetooth = Bluetooth.get_default()

  const connected = createBinding(bluetooth, 'isConnected')

  const batteryPercentage = createPoll('', 1000, () => (
    (findConnectedDevices(bluetooth.get_devices()).batteryPercentage * 100)
      .toString() + '%'
  ))

  const deviceName = createPoll('', 1000, () => (
    findConnectedDevices(bluetooth.get_devices()).name
  ))

  return (
    <box
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={['panel']}
      visible={connected}
    >
      <box spacing={3}>
        <image
          icon_name={'bluetooth-connected'}
        />
        <box spacing={6}>
          <label
            label={deviceName}
          />
          <label
            label={batteryPercentage}
            visible={batteryPercentage.as((perc) => perc !== '-100%')}
          />
        </box>
      </box>
    </box>
  )
}

export default BluetoothPanel
