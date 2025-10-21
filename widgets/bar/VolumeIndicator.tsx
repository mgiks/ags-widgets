import Gtk from 'gi://Gtk?version=4.0'
import Wp from 'gi://AstalWp'
import { Accessor, createBinding } from 'ags'

function VolumeIndicator() {
  const wp = Wp.get_default()
  const defaultSpeaker = wp?.audio.default_speaker

  const volume = createBinding(
    defaultSpeaker!,
    'volume',
  )

  const isMuted = createBinding(defaultSpeaker!, 'mute')

  return (
    <box
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={['panel']}
      spacing={3}
    >
      <image iconName={isMuted.as((isMuted) => isMuted ? 'muted' : 'volume')}>
      </image>
      <box>
        <label
          label={volume.as((v) => (v * 100).toFixed(0).toString() + '%')}
        />
      </box>
    </box>
  )
}

export default VolumeIndicator
