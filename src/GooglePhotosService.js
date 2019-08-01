const testData = [
  {id: '1', title: 'Album 1', description: 'some album description 1'},
  {id: '2', title: 'Album 2', description: 'some album description 2'},
  {id: '3', title: 'Album 3', description: 'some album description 3'},
  {id: '4', title: 'Album 4', description: 'some album description 4'},
  {id: '5', title: 'Album 5', description: 'some album description 5'},
]

class GooglePhotosService {
  loadAlbums() {
    return new Promise( function(resolve, reject) {
      setTimeout( 
        function() {
          resolve(
            /*
            [
              { id: 1, title: 'uno'},
              { id: 2, title: 'oos'},
              { id: 3, title: 'tres'},
              { id: 4, title: 'quatro'},
              { id: 5, title: 'cinqo'},
            ]
            */
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
            /*[   
              { id: 101, description: 'sadsa asd as'}
            ]
            */
            testData.find(function(album) {
              return album.id === id
            })
          )
        }, 
        3000
      );
    });
  }

}

export default GooglePhotosService;