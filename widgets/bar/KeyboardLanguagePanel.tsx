import { bind, exec, Variable } from 'astal'
import Hyprland from 'gi://AstalHyprland'

function cycleLanguage() {
  exec("bash -c 'hyprctl switchxkblayout current next'")
}

function KeyboardLanguagePanel({ isSeparate }: { isSeparate: boolean }) {
  const hyprland = Hyprland.get_default()

  let kbLayout = Variable('en')

  hyprland.connect(
    'keyboard-layout',
    (_: Hyprland.Hyprland, __: string, layout: string) => {
      kbLayout.set(layout.toLowerCase().slice(0, 2))
    },
  )

  const classes = isSeparate ? ['container'] : ['']

  return (
    <box
      onButtonPressed={() => cycleLanguage()}
      cssClasses={classes}
      spacing={3}
    >
      <image iconName='globe' />
      <label>
        {bind(kbLayout())}
      </label>
    </box>
  )
}

export default KeyboardLanguagePanel
