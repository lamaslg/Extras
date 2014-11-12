angular.module('starter.controllers', [])

.controller('FotosCtrl', function($scope) {

$scope.foto={data:''};
$scope.capturar=function(){

    alert("Antes");
    try {
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
            destinationType: navigator.camera.DestinationType.FILE_URI });


    }catch(e){
        alert(e.toString());

    }
alert("despues");

};
      function onFail(message) {
        alert(message);
      }
      function onPhotoDataSuccess(imageData) {
        // Uncomment to view the base64-encoded image data
        console.log(imageData);
        $scope.foto.data=imageData;

// /var img=document.getElementById("smallImage");
//alert(img.toString());
        //
    // img.src = imageData;//"data:image/jpeg;base64," + imageData;

      }
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('BbddCtrl', function($scope) {

        $scope.testTabla=function(){


            var db = openDatabase('gamdb2', '1.0', 'Test DB', 2 * 1024 * 1024);

            db.transaction(function (tx) {

          try {
              tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='datos';", [], function (tx, results) {
                  var len = results.rows.length, i;
                  var msg = "<p>Found rows: " + len + "</p>";
                  document.getElementById('statusquery').innerHTML += msg;
                  for (i = 0; i < len; i++) {
                      msg = "<p><b>" + results.rows.item(i).log + "</b></p>";
                      document.getElementById('statusquery').innerHTML += msg;
                  }
              }, null);
          }
                catch (e){
                    alert(e.toString());

                }
            });


        };
        $scope.crearTabla=function(){
            var db = openDatabase('gamdb2', '1.0', 'Test DB', 2 * 1024 * 1024);
            var msg;
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE LOGS (id unique, log)',function(tx){},error);
                tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "foobar")',function(tx){},error);
                tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "logmsg")',function(tx){},error);
                msg = '<p>Log message created and row inserted.</p>';
                document.getElementById('statusquery').innerHTML =  msg;
            });

        };
        $scope.insertarDatos=function(){};
        $scope.consultarDatos=function(){
            var db = openDatabase('gamdb2', '1.0', 'Test DB', 2 * 1024 * 1024);
            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
                    var len = results.rows.length, i;
                    var msg = "<p>Found rows: " + len + "</p>";
                    document.getElementById('statusquery').innerHTML +=  msg;
                    for (i = 0; i < len; i++){
                        msg = "<p><b>" + results.rows.item(i).log + "</b></p>";
                        document.getElementById('statusquery').innerHTML +=  msg;
                    }
                }, error);
            });


        };

        function error(tx,err){

            alert(JSON.stringify( err));
        }

});
