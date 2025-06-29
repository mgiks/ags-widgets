import { createState } from 'ags'
import { exec } from 'ags/process'
import Hyprland from 'gi://AstalHyprland'
import Gtk from 'gi://Gtk?version=4.0'

function KeyboardLanguagePanel() {
  const hyprland = Hyprland.get_default()

  const [kbLayout, setKbLayout] = createState(
    shortenLanguageName(getCurrentLanguage()),
  )

  const [tooltipText, setToolTipText] = createState(getCurrentLanguage())

  hyprland.connect(
    'keyboard-layout',
    (_, __, layout: string) => {
      setKbLayout(shortenLanguageName(layout))
      setToolTipText(layout)
      getCurrentLanguage()
    },
  )

  return (
    <box
      cssClasses={['panel']}
      spacing={3}
      tooltipText={tooltipText}
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
    >
      <Gtk.GestureClick onPressed={cycleLanguage} />
      <image iconName='globe' />
      <label label={kbLayout} />
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
