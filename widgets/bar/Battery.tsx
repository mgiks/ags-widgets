import AstalBattery01 from 'gi://AstalBattery'
import getBatteryIconName from './utils/getBatteryIcon'
import { bind, Variable } from 'astal'

function Battery() {
  const battery = AstalBattery01.get_default()
  const percentage = bind(battery, 'percentage')
  const batteryIcon = Variable.derive(
    [percentage, bind(battery, 'charging')],
    (percentage, charging) => {
      return getBatteryIconName(percentage, charging)
    },
  )

  return (
    <box spacing={0}>
      <image
        iconName={batteryIcon()}
      />
      <box>
        {percentage.as((
          percentage,
        ) => (Math.round(percentage * 100).toString() + '%'))}
      </box>
    </box>
  )
}

export default Battery
