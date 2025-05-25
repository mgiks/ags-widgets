import { bind } from 'astal'
import Network from 'gi://AstalNetwork'

function WifiPanel({ isSeparate }: { isSeparate: boolean }) {
  const network = Network.get_default()
  const wifi = bind(network, 'wifi')

  const classes = isSeparate ? ['container'] : ['']

  return (
    <box cssClasses={classes}>
      {wifi.as((wifi) =>
        wifi && (
          <box spacing={3}>
            <image
              iconName={bind(wifi, 'iconName').as((iconName) => {
                const trimmedIconName = iconName.slice(
                  0,
                  iconName.indexOf('symbolic'),
                )
                iconName = trimmedIconName + 'custom'
                return iconName
              })}
            />
            <label>{bind(wifi, 'ssid').as(String)}</label>
          </box>
        )
      )}
    </box>
  )
}

export default WifiPanel
