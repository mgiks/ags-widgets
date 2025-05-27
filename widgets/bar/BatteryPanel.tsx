import AstalBattery01 from 'gi://AstalBattery'
import { constructBatteryIconName } from './utils/constructBatteryIconName'
import { bind, Variable } from 'astal'

function BatteryPanel({ isSeparate }: { isSeparate: boolean }) {
  const battery = AstalBattery01.get_default()
  const percentage = bind(battery, 'percentage')
  const batteryIconName = Variable.derive(
    [percentage, bind(battery, 'charging')],
    (percentage, charging) => {
      return constructBatteryIconName(percentage, charging)
    },
  )

  const classes = isSeparate ? ['container'] : ['']

  return (
    <box cssClasses={classes} spacing={0}>
      <image
        iconName={batteryIconName()}
      />
      <box>
        {percentage.as((
          percentage,
        ) => (Math.round(percentage * 100).toString() + '%'))}
      </box>
    </box>
  )
}

export default BatteryPanel
