import { Accessor, createBinding, For } from 'ags'
import { Astal, Gdk, Gtk } from 'ags/gtk4'
import app from 'ags/gtk4/app'
import { execAsync } from 'ags/process'
import Network from 'gi://AstalNetwork'

export const WIFI_CHOOSER_WINDOW_NAME = 'wifi-chooser'

export default function WifiChooser(
  { gdkmonitor }: {
    gdkmonitor: Gdk.Monitor
  },
) {
  const network: Network.Network = Network.get_default()
  const accessPoints = createBinding(network.wifi, 'accessPoints')

  return (
    <window
      name={WIFI_CHOOSER_WINDOW_NAME}
      cssClasses={['widget']}
      gdkmonitor={gdkmonitor}
      application={app}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      keymode={Astal.Keymode.EXCLUSIVE}
      onNotifyVisible={() => {
        execAsync(`nmcli device wifi rescan`)
      }}
      resizable={false}
    >
      <Gtk.EventControllerKey
        onKeyPressed={({ widget }, keyval) => {
          switch (keyval) {
            case (Gdk.KEY_Escape):
              widget.hide()
              break
            case (Gdk.KEY_j):
              widget.child_focus(Gtk.DirectionType.TAB_FORWARD)
              break
            case (Gdk.KEY_k):
              widget.child_focus(Gtk.DirectionType.TAB_BACKWARD)
              break
          }
        }}
      />
      <box
        cssClasses={['wifi-chooser']}
        hexpand={true}
        orientation={Gtk.Orientation.VERTICAL}
      >
        <scrolledwindow vexpand>
          <box
            orientation={Gtk.Orientation.VERTICAL}
          >
            <For each={accessPoints}>
              {(accessPoint, _) => (
                <button
                  visible={accessPoint.ssid ? true : false}
                  cssClasses={['wifi-chooser__button']}
                  onClicked={async () => (hide(),
                    connectToNetwork(accessPoint.ssid))}
                >
                  <box
                    spacing={4}
                    orientation={Gtk.Orientation.HORIZONTAL}
                  >
                    <image
                      iconName={accessPoint.iconName.replace(
                        'symbolic',
                        'custom',
                      )}
                    />
                    <label label={accessPoint.ssid} />
                  </box>
                </button>
              )}
            </For>
          </box>
        </scrolledwindow>
      </box>
    </window>
  )
}

function connectToNetwork(network: string) {
  execAsync(`nmcli device wifi connect ${network} --ask`)
}

function hide() {
  app.get_window(WIFI_CHOOSER_WINDOW_NAME)?.hide()
}
