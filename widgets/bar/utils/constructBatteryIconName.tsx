export function constructBatteryIconName(
  batteryPercentage: number,
  isCharging: boolean,
) {
  batteryPercentage = Math.round(batteryPercentage * 100)
  let batteryIconName = ''

  switch (true) {
    case (0 < batteryPercentage && batteryPercentage <= 14):
      batteryIconName = 'battery-at-1'
      break
    case (15 <= batteryPercentage && batteryPercentage <= 28):
      batteryIconName = 'battery-at-2'
      break
    case (29 <= batteryPercentage && batteryPercentage <= 42):
      batteryIconName = 'battery-at-3'
      break
    case (43 <= batteryPercentage && batteryPercentage <= 56):
      batteryIconName = 'battery-at-4'
      break
    case (57 <= batteryPercentage && batteryPercentage <= 70):
      batteryIconName = 'battery-at-5'
      break
    case (71 <= batteryPercentage && batteryPercentage <= 89):
      batteryIconName = 'battery-at-6'
      break
    case (90 <= batteryPercentage):
      batteryIconName = 'battery-at-full'
      break
  }

  if (isCharging) {
    batteryIconName = batteryIconName + '-charging'
  }

  return batteryIconName
}
