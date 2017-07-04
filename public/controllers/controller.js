var app=angular.module('myApp',[]);

app.controller('AppCtrl',['$scope','$http',function($scope,$http){
    console.log("Hello world from controller 2");
    $scope.contactbutton=true;

    var refresh=function(){
        $http.get('/contactlist').then(function(response){
            console.log(response.data);
            $scope.contactList = response.data;
            $scope.contact={};
            
        });
    };
refresh();
    $scope.addContact=function(){
        console.log($scope.contact)
        $http.post('/contactlist',$scope.contact).then(function(response){
            console.log(response.data);
            refresh();
        });
    };
    
    $scope.remove=function(id){
        console.log('Remove' + id);
        $http.delete('/contactlist/'+id).then(function(response){
            refresh();
        });
    };
    
    $scope.edit=function(id){
        console.log(id);
        $http.get('/contactlist/'+id).then(function(response){
            $scope.contact=response.data;

                    $scope.contactbutton=false;
            
        });
    };
    $scope.update=function(id){
        console.log($scope.contact._id);
        $http.put('/contactlist/'+$scope.contact._id,$scope.contact).then(function(response){
            refresh();
            $scope.contactbutton=true;
        });
    };
    $scope.deselect=function(){
        $scope.contact="";
    }
}])