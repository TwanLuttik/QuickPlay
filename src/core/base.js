import Pulse from 'pulse-framework';

import songs from './collections/songs.collection';
import os from 'os';


const pulse = new  Pulse.Library({
  collections: {
    songs
  },
  data: {
    volume: 0.05,
    mode: 'normal',
    random: false,
    muted: false,
    tab: 'songs',
    settingsTab: 'General',
    locations: [`${os.homedir}\\Music\\`]
  },
  persist: ['volume', 'tab', 'locations', 'mode'],
  actions: {

    addLocation({ base, songs }, value) {
      if (value ===  undefined) return
      var loc = base.locations;
      loc.push(value)
      base.locations = loc;

      // re initialize the songs
      songs.init();
    },

    removeLocation({ base, songs }, location) {
      var loc = base.locations;
      var indexRemove = loc.indexOf(location);
      loc.splice(indexRemove, 1)
      base.locations = loc;

      // base.locations = base.locations

      // re initialize the songs
      songs.init();
    }
  }
});

export default pulse;