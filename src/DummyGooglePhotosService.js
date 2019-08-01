const testData = [
  {id: '1', title: 'Album 1', description: 'some album description 1'},
  {id: '2', title: 'Album 2', description: 'some album description 2'},
  {id: '3', title: 'Album 3', description: 'some album description 3'},
  {id: '4', title: 'Album 4', description: 'some album description 4'},
  {id: '5', title: 'Album 5', description: 'some album description 5'},
]

class DummyGooglePhotosService {
  loadAlbums() {
    return new Promise( function(resolve, reject) {
      setTimeout( 
        function() {
          resolve(
            testData.map(function(album) {
              return {id: album.id, title: album.title}
            })
          )
        }, 
        3000
      );
    });
  }

  loadAlbumDetail(id) {
    return new Promise( function(resolve, reject) {
      setTimeout( 
        function() {
          resolve(       
            //find() returns first match of function provided
            testData.find(function(album) {
              console.log("inside loadAlbumDetail")
              return album.id === id
            })
          )
        }, 
        3000
      );
    });
  }

}

export default DummyGooglePhotosService;