import { bind, Variable } from 'astal'
import Hyprland from 'gi://AstalHyprland'

function KeyboardLanguage() {
  const hyprland = Hyprland.get_default()

  let kbLayout = Variable('en')

  hyprland.connect(
    'keyboard-layout',
    (_: Hyprland.Hyprland, __: string, layout: string) => {
      kbLayout.set(layout.toLowerCase().slice(0, 2))
    },
  )

  return (
    <box spacing={3}>
      <image iconName='globe' />
      <label>
        {bind(kbLayout())}
      </label>
    </box>
  )
}

export default KeyboardLanguage
