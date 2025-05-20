import { bind } from "astal";
import Network from "gi://AstalNetwork";

function Wifi() {
  const network = Network.get_default();
  const wifi = bind(network, "wifi");

  return (
    <box cssClasses={["wifi"]}>
      {wifi.as((wifi) =>
        wifi && (
          <box spacing={3}>
            <image
              iconName={bind(wifi, "iconName").as((iconName) => {
                const trimmedIconName = iconName.slice(
                  0,
                  iconName.indexOf("symbolic"),
                );
                iconName = trimmedIconName + "custom";
                return iconName;
              })}
            />
            <label>{bind(wifi, "ssid").as(String)}</label>
          </box>
        )
      )}
    </box>
  );
}

export default Wifi;
