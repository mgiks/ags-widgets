import AstalBattery from "gi://AstalBattery";
import getBatteryIconName from "./utils/getBatteryIcon";
import { bind, Variable } from "astal";

function Battery() {
  const battery = AstalBattery.get_default();
  const batteryIcon = Variable.derive(
    [bind(battery, "percentage"), bind(battery, "charging")],
    (percentage, charging) => {
      return getBatteryIconName(percentage, charging);
    },
  );

  return (
    <box spacing={0}>
      <image
        iconName={batteryIcon()}
      />
      <box>
        {bind(battery, "percentage").as((
          percentage,
        ) => (Math.round(percentage * 100).toString() + "%"))}
      </box>
    </box>
  );
}

export default Battery;
