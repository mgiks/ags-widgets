import { bind, exec, Variable } from 'astal'
import Hyprland from 'gi://AstalHyprland'
import { Gtk } from 'astal/gtk4'

const shouldFirstChildBeRevealed = Variable(true)
const shouldSecondChildBeRevealed = Variable(false)

function KeyboardLanguagePanel({ isSeparate }: { isSeparate: boolean }) {
  const hyprland = Hyprland.get_default()

  const kbLayout = Variable(shortenLanguageName(getCurrentLanguage()))
  const firstChildKbLayout = Variable('')
  const secondChildKbLayout = Variable('')

  const tooltipText = Variable(getCurrentLanguage())

  hyprland.connect(
    'keyboard-layout',
    (_, __, layout: string) => {
      kbLayout.set(shortenLanguageName(layout))
      tooltipText.set(layout)
      getCurrentLanguage()
    },
  )

  const classes = isSeparate ? ['container'] : ['']

  return (
    <box
      onButtonPressed={() => {
        cycleLanguage()
      }}
      cssClasses={classes}
      spacing={3}
      tooltipText={tooltipText()}
    >
      <image iconName='globe' />
      <revealer
        revealChild={shouldFirstChildBeRevealed()}
        transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
      >
        <label>{bind(kbLayout())}</label>
      </revealer>
      <revealer
        revealChild={shouldSecondChildBeRevealed()}
        transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
      >
        <label>{bind(kbLayout())}</label>
      </revealer>
    </box>
  )
}

function cycleLanguage() {
  exec("bash -c 'hyprctl switchxkblayout current next'")
}

function getCurrentLanguage() {
  const result = exec(
    `bash -c "hyprctl devices -j | jq -r '.keyboards[] | select(.main != false) | .active_keymap'"`,
  )
  return result
}

function shortenLanguageName(language: string) {
  return language.toLowerCase().slice(0, 2)
}

export default KeyboardLanguagePanel
