import fs from 'fs';
import path from 'path';

export default {
  data: {
    list: [],
    currentSong: {},
    currentTime: null,
    searchList: [],
    songSearch: '',
    // favorites: [],
    listType: 'list'
  },
  persist: ['list', 'favorites', 'listType'],
  actions: {
    
    // initialize all the songs from the locations
    async init({ songs }) {
      console.log('[INIT] Starting')
      // songs.list = [];

      
      var folders = await songs.searchFolders();

      // loop trough the saved locations
      for (const index in folders) {
        var location = folders[index] + '\\'
        var readFolder = fs.readdirSync(location)

        for (const index in readFolder) {
          var file = readFolder[index];
          
          var info = path.parse(location + '\\'+ file);
          
          let xx = false;
          for (const index in songs.list) {
            if (songs.list[index].path === location + "\\" + file) xx = true;
          }

          if (xx) continue;

          // check if we have an audio file
          if (info.ext.includes('mp3', 'mp4')) {
            songs.list.push({
              name: info.name,
              path: info.dir + "\\" + info.base,
              type: info.ext.replace('.', ''),
              length: '0:00'
            }) 
          }

        }

      }

      songs.list = songs.list.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });

      // await songs.buildFolderStructure();
      

      console.log('[INIT] Done')
    },

    async searchFolders({ base }) {
      console.log('[DEEPSEARCHING_FOLDERS] Starting')

      let preferedLocations = base.locations.slice()
      var foldersFound = [];
      var searchingQueue = [];
      var findEverything = false;

      // add the preferred locations from the settings
      searchingQueue = preferedLocations;

      while (!findEverything == true) {

        for (const index in searchingQueue) {
          var folderPath = searchingQueue[index];

          // check if the actual folder exist
          if (!fs.existsSync(folderPath))  {
            console.log(folderPath + " doesn't exist")
            searchingQueue.splice(index, 1);
            // TODO: maybe remove the folder from the preferred locations
            break;
          }

          // loop trough the folder
          var readFolder = fs.readdirSync(folderPath);

          // if there is no folders, it won't loop
          for (const index in readFolder) {
            // define the file
            var file = readFolder[index];
            var info = path.parse(folderPath + '\\' + file);
            
            // check if its a folder or if its already searched
            if (info.ext === '' && !foldersFound.includes(folderPath + '\\' + info.name)) {
              // add the folder to the search queue
              searchingQueue.push(folderPath + '\\' + info.name);
              foldersFound.push(folderPath + '\\' + info.name);

            } 
          }
          // remove the folder from the search queue
          searchingQueue.splice(index, 1);
        }

        if (searchingQueue.length === 0) findEverything = true;
      }

      console.log('[DEEPSEARCHING_FOLDERS] Done')
      return foldersFound
    },

    async buildFolderStructure({ base, songs }) {
      return
      console.log('[buildFolderStructure]')
      const folders = await songs.searchFolders(); 
      
      var folderStructure = {}
      var unlisted = [];
      var done = false;
      var regex = /\\/g
      // var a = folders[index].match(regex).length;


      var parentFolder = folders[0].slice(0, (folders[0].lastIndexOf('\\')+1));
      console.log(parentFolder)

      // make the array look nice for better structer
      for (const index in folders) {
        unlisted.push(folders[index].replace(parentFolder, ''))
      }
      console.log(unlisted)

      while (!done) {

        for (const index in unlisted) {

          // folder = "name"
          // sub-folder = "\name2"
          // sub-sub-folder = "name\name2\name3" 

          // Spinnen Records\folder\test
          // folderStructure[Spinnen Records][folder][test] = {}

          var location = unlisted[index]
          
          var subFolderCount = location.match(regex);
          // console.log(subFolderCount)

          // no subfolder check
          if (subFolderCount === null) {
            folderStructure[location] = {}
          } else {

            var parent = location.split('\\')[0];
            var path = location.split('\\');
            delete path[0];
            // console.log(path)

            var block = {}
            var firstBlock = firstBlock = {
              [path[0]]: {}
            }
            var previousBlock = ''
            var max = (parseInt(path.length) - 1)
            for (const index1 in path) {
              // if (index == 0) continue
              // block[path[index1]] = {};
              // var a = {
              //   [path[index1]]: {}
              // }
              // var a = {
              //   'a': {
              //     'b': {
              //       'c': {
              //         'd': {
                  
              //         }
              //       }
              //     }
              //   }
              // }

              var i = parseInt(index1);

              if (i === 0) {
                block = {
                  [path[i]]: {}
                }
                continue
              }

              block = {
                [path[i]]: block
              }

              // if (i === 0) {
              //   block = {
              //     [path[i]]: {}
              //   }
              // } else {
              //   // var a = {
              //   //   [path[i-1]]: {}
              //   // }
                
              //   block = {
              //     [path[i]]: {
              //       [path[i-1]]: {}
              //     }
              //   }

              // }

            }

            // console.log(block)
            Object.assign(folderStructure[parent], block)

            
            
            // folderStructure[parent][block] = {}
            // console.log(b)


            // name\a\b\c\d
            // {name} [\a] [\b] [\c] [\d]

            // folderStructure[location][loc2][loc3] = {}
          }






          
          var parent = location.slice(location.indexOf('\\'), location.length)
          var x1 = location.replace(parent + "\\", [parent + "\\"][location.slice(location.indexOf('\\', 1), location.indexOf('\\', 2))])

          // folderStructure[location] = {}
          // folderStructure[x1] = {}

          // var a = folders[index].lastIndexOf('\\');
          // var b = folders[index].slice(a, folders[index].length);
          // console.log(b)

        }

        done = true
      }

      console.log(folderStructure)
      return
    },


    readString(dataView, offset, length) {
      var o = '';
      for (var i = offset; i < offset + length; i++) {
        // keep only printable characters
        if (i >= 32) o += String.fromCharCode(dataView.getUint8(i));
      }
      return o;
    },

    /**
     * 
     * @param {*} ref is the audio player
     * @param {*} songPath the path of the song
     */
    playSong({ songs }, parent, songPath) {
      var player = parent.$refs.player;
      
      player.src = songPath

      var playPromise = player.play();

      if (playPromise !== undefined) {
        playPromise.then(res => {
          // Automatic playback started!
          // Show playing UI.
        })
        .catch(error => {
          // Auto-play was prevented
          // Show paused UI.
        });
      }

      // songs.currentTime = player.currentTime
      // songs.SetSong(ref, song)
    },

    // next
    // previous
    songHandler({ songs, base }, ref, h) {
    
      var playlist = songs[songs.listType];
      var maxIndexOfPlaylist = (playlist.length - 1)
      


      // get the index of the song from the current playlist
      var indexSong = 0;
      for (const index in playlist) {
        if (playlist[index].path === songs.currentSong.path) {
          var number = parseInt(index)
          indexSong = number;
          break;
        }
      }

      //TODO: change this to a case
      if (base.mode === 'repeat_once' && h === undefined) ref.$refs.player.currentTime = 0, ref.$refs.player.play();
      else if (base.mode === 'repeat' && !base.random && maxIndexOfPlaylist === indexSong && h == undefined) songs.currentSong = playlist[0]
      else if (base.mode === 'repeat' && !base.random && maxIndexOfPlaylist !== indexSong && h == undefined) songs.currentSong = playlist[indexSong+1]
      else if (base.mode === 'repeat' && base.ranbom && h == undefined) songs.currentSong = playlist[songs.random(0, maxIndexOfPlaylist, indexSong)]
      
      else if (base.mode === 'normal' && !base.random && h == undefined) songs.currentSong = playlist[indexSong+1] 
      else if (base.mode === 'normal' && base.random && h == undefined) songs.currentSong = playlist[songs.random(0, maxIndexOfPlaylist, indexSong)] 

      // !! if random is enabled, we don't have to listen to the repeat
      // next & previous don't listen for repeat 
      else if (!base.random && h === 'next'&& maxIndexOfPlaylist === indexSong) songs.currentSong = playlist[0] 
      else if (!base.random && h === 'next'&& maxIndexOfPlaylist !== indexSong) songs.currentSong = playlist[indexSong+1] 
      else if (base.random && h === 'next') songs.currentSong = playlist[songs.random(0, maxIndexOfPlaylist, indexSong)] 

      else if (!base.random && h === 'previous'&& indexSong === 0) ref.$refs.player.currentTime = 0, ref.$refs.player.play();
      else if (!base.random && h === 'previous') songs.currentSong = playlist[indexSong-1] 
      else if (base.random && h === 'previous') songs.currentSong = playlist[songs.random(0, maxIndexOfPlaylist, indexSong)] 

    },

    random({}, min, max, current) {
      var found = false
      let number = 0;

      while (!found) {
        number = Math.round(Math.random() * (min + max) + min)
        if (number !== current) found = true
      }
      return number
    },


    searchByName({ songs }, search) {
      songs.searchList = [];
      songs.list.forEach(item => {
        if (item.name.toLowerCase().includes(search)) songs.searchList.push(item);
      })
    },

    PlayPause({}, parent) {
      parent.$refs.player.play();
    },

    toggleFavorite({ songs }, v) {
      let s = songs.list;
      let f = songs.favorites;

      console.log(v.isFavorite)
      if (v.isFavorite !== undefined) {
        console.log('removing song to fav')
        // remove the song from favorites

        // var index = f.indexOf(v);
        // f.splice(index, 1);
        // songs.favorites = f;

        // add a favorite key to the song object
        
        for (const index in s) {
          if (s[index].path === v.path) delete s[index].isFavorite;
        }

        songs.list = s;

        
      } else {
        console.log('adding song from fav')
        // add the song to favorites
        // f.push(v);
        // songs.favorites = f;

        // add a favorite key to the song object
        for (const index in s) {
          if (s[index].path === v.path) s[index].isFavorite = true;
        }
        songs.list = s;
        
      }
    }


  },
  filters: {
    songs({ songs }) {
      if (songs.songSearch === '') return songs.list;

      var a = [];
      songs.list.forEach(item => {
        if (item.name.toLowerCase().includes(songs.songSearch)) a.push(item);
      })
      return a;
    },
    favorites({ songs }) {
      var a = [];
      songs.list.forEach(o => {
        if (o.isFavorite) a.push(o)
      })

      return a;
    }
  }
}