function getBatteryIconName(batteryPercentage: number, isCharging: boolean) {
  batteryPercentage *= 100;
  batteryPercentage = Math.round(batteryPercentage);
  let batteryIcon = "";

  switch (true) {
    case (0 < batteryPercentage && batteryPercentage <= 14):
      batteryIcon = "battery-at-1";
      break;
    case (15 <= batteryPercentage && batteryPercentage <= 28):
      batteryIcon = "battery-at-2";
      break;
    case (29 <= batteryPercentage && batteryPercentage <= 42):
      batteryIcon = "battery-at-3";
      break;
    case (43 <= batteryPercentage && batteryPercentage <= 56):
      batteryIcon = "battery-at-4";
      break;
    case (57 <= batteryPercentage && batteryPercentage <= 70):
      batteryIcon = "battery-at-5";
      break;
    case (71 <= batteryPercentage && batteryPercentage <= 89):
      batteryIcon = "battery-at-6";
      break;
    case (90 <= batteryPercentage):
      batteryIcon = "battery-at-full";
      break;
  }

  if (isCharging) {
    batteryIcon = batteryIcon + "-charging";
  }

  return batteryIcon;
}

export default getBatteryIconName;
