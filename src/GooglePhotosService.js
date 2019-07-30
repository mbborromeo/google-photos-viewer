class GooglePhotosService {
  loadAlbums() {
    return new Promise( function(resolve, reject) {
      setTimeout( function() {
        resolve(
          [
            { id: 1, title: 'uno'},
            { id: 2, title: 'oos'},
            { id: 3, title: 'tres'},
            { id: 4, title: 'quatro'},
            { id: 5, title: 'cinqo'},
          ]
        )
      }, 
      3000);
    });
  }

  loadAlbumDetail(id) {
    return new Promise( function(resolve, reject) {
      setTimeout( function() {
        resolve(       
          [   
            { id: 101, description: 'sadsa asd as'}
          ]
        )
      }, 
      3000);
    });
  }
}

export default GooglePhotosService;