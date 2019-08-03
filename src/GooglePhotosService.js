class GooglePhotosService {
  constructor(gapiClient) {
    this.gapiClient = gapiClient
  }

  loadAlbums() {
    return this.gapiClient
      .photoslibrary
      .albums
      .list({})
      .then( function( fullResponse ) { //{ result: { albums } }     
        const albums = fullResponse.result.albums;
        // Handle the results here (response.result has the parsed body).
        return albums;
      });
  }

  loadAlbumDetail(id) {
    return this.gapiClient
      .photoslibrary
      .albums
      .get({albumId: id})
      .then((response) => {
        console.log('album gathered')
        return response.result;
      })
      .then((album) => {
        console.log('getting media items for', album)
        return this.gapiClient
          .photoslibrary
          .mediaItems
          .search({albumId: id})
          .then(function(response) {
            console.log('media search done', response)
            const mediaItems = response.result.mediaItems

            return {
              ...album,
              mediaItems: mediaItems
            }
          })
      })
      .catch(function(e) {
        return undefined
      })
  }

  loadPhotoDetail(id) {
    return this.gapiClient
      .photoslibrary
      .mediaItems
      .get({mediaItemId: id})
      .then((response) => {
        console.log('photo gathered')
        console.log(response);
        return response.result;
      })      
      .catch(function(e) {
        return undefined
      })
  }
}

export default GooglePhotosService