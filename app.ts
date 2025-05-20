import { App } from "astal/gtk4";
import style from "./style.css";
import Bar from "./widgets/bar/Bar";

App.add_icons("/home/mgik/.config/ags/icons");
App.start({
  css: style,
  main() {
    App.get_monitors().map(Bar);
  },
});
