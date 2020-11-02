app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data,$window) {
    //initially set those objects to null to avoid undefined error

var msgNotFound = [{status:'error'},{message:'No data founds'}];
var limit= 50;
var sponsorID;
var vID=0,thread_p=0


$rootScope.getheight = $window.innerHeight - 230;
$rootScope.getwidth = $window.innerWidth - 300;
$rootScope.getheightD = $window.innerHeight - 400;
var now = new Date();
var prevMonth = new Date(now.getFullYear(),now.getMonth()-1,now.getDate());
var nextMonth = new Date(now.getFullYear(),now.getMonth()+1,now.getDate());
$scope.date ={ from :prevMonth.toDateString() , to: now.toDateString()}

$scope.getWidth = function() {
    return window.innerWidth;
};
  
   window.onresize = function() {
       $rootScope.getheight = $window.innerHeight - 230;
       $rootScope.getwidth = $window.innerWidth - 300;
       $rootScope.getheightD = $window.innerHeight - 400;
       $scope.$apply();
};

var $eventsponsor=$('#sponsorid');
    $eventsponsor.select2({
      placeholder: "Select Sponsor ID",
      allowClear: true
  });

 


$(window).on('load',function(e){
    
}); 

  $scope.loadAllSponsor = function (limit) {
    $scope.cache.isLoadingSponsor =true
    $scope.cache.sponsors=[]
    Data.post('loadAllSponsor',{
        limit:limit
    }).then(function (results) {
        $scope.cache.isLoadingSponsor =false
        $scope.cache.sponsors =results
        $scope.cache.sponsors_= $scope.cache.sponsors.filter(function(obj){
          return obj.status=='1'
        })
        
    });
}

$scope.loadAllSponsors = function (limit) {
    $scope.cache.isLoadingSponsor =true
    $scope.cache.sponsors=[]
    Data.post('loadAllSponsorall',{
        limit:limit
    }).then(function (results) {
        $scope.cache.isLoadingSponsor =false
        $scope.cache.allsponsors =results
        $scope.cache.allsponsors.reverse();
    });
}

$scope.getData = function(data) {
    $scope.cache.oldData   = data
    $scope.cache.clickedData = data
}


$scope.filterByID = function(id){
    $scope.cache.sponsor_data_thread=[]
    Data.post('loadSponsorOneData',{
        id : id
    }).then(function (results) {
        $scope.cache.sponsor_data = results;
        $rootScope.userDetails_ = $scope.cache.sponsor_data[0];
        $scope.filterByIDs($scope.cache.sponsor_data[0])
      
    });
        
}

$scope.filterByIDs = function(id){
    $scope.cache.sponsorG_data=[]
    $scope.cache.status=[]
    $scope.cache.statusActive=[]
    if(id.uid>1){
    Data.post('loadSponsorGroupData',{
        id : id.thread_g,s_ids:id.uid,createdby:id.uid
    }).then(function (results) {
        $scope.cache.sponsorG_data = results;
        $scope.cache.status = $scope.cache.sponsorG_data.filter(function(obj){
             return obj.status == '0'
        });
             $scope.cache.statusActive = $scope.cache.sponsorG_data.filter(function(obj){
                return obj.status == '1'
        });

    });  
}else{
    Data.post('loadSponsorGroupData1',{
        id : id.thread_g,s_ids:id.uid,createdby:id.uid
    }).then(function (results) {
        $scope.cache.sponsorG_data = results;
        $scope.cache.status = $scope.cache.sponsorG_data.filter(function(obj){
             return obj.status == '0'
        });
             $scope.cache.statusActive = $scope.cache.sponsorG_data.filter(function(obj){
                return obj.status == '1'
        });

    }); 
}
}

$scope.loadAllSponsor(limit);

    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function (customer) {
        $scope.cache.isUthenticating = true
        Data.post('login', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('dashboard');
                $scope.filterByID(results.uid);
                $scope.loadMyteam(results.uid)
            }
            $scope.cache.isUthenticating = false
        });
    };

    $scope.signup = {email:'',password:'',name:'',phone:'',address:''};
    var msgSponsorID = [{status:'error'},{message:'No data founds'}];

    $scope.signUp = function (customer) {
        if($scope.cache.sponsors.length>=1){
            if($eventsponsor.val().length<=0){
                alert('Please select sponsor ID')
              }else{
                Data.post('signUp', {
                    customer: customer
                }).then(function (results) {
                    Data.toast(results);
                    $scope.cache.rs = results
                    if (results.status == "success") {
                        $scope.filterByID(results.uid);
                        $scope.loadMyteam(results.uid);
                        $scope.allSponsorByID($scope.cache.sponsor_data[0].uid);
                        $location.path('dashboard');
                    }
                });
              }
           }else{
            $eventsponsor.val('NTM-0');
           }  
       
};

$scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $rootScope.authenticated = false;
            $scope.cache={}
            location.reload();
            $location.path('login');
          
        });
}

$scope.savePayments = function (pay) {
         Data.post('feesPayments', {
                payment_amt:tonumberformat(pay.amount),pay_id:$rootScope.uid
            }).then(function (results) {
                Data.toast(results);
                $rootScope.clearPayments_s();
                $rootScope.hideShowModal('#paymentsModal');
                $scope.filterByID($rootScope.uid);
    });
};


  
$eventsponsor.on("change", function (e) {
    $scope.signup.thread_id = $(this).val()
     var id = $scope.signup.thread_id.replace('NTM-0','')
     vID = id
     $scope.filterByID(id)
     if(parseInt(vID)==1){
         $scope.signup.thread_pos = 2;
         $scope.signup.thread_g = $scope.signup.thread_pos;
         }else{
         $scope.signup.thread_pos = parseInt($scope.cache.sponsor_data[0].thread_pos)+1;
         $scope.signup.thread_g = $scope.signup.thread_pos;
     }
   });

$scope.loadID = function(){
       if($scope.cache.sponsors.length>1){
       }else{
       }  
   }

   $scope.uniqueUsers = function(name){
    $scope.cache.unifyUsername = $scope.cache.allUsers.filter(function(obj){
       return obj.username.trim() == name.toLowerCase().trim()
    }).length;
}

$scope.uniquePhone = function(phone){
    $scope.cache.unifyPhone = $scope.cache.allUsers.filter(function(obj){
       return obj.phone.trim() == phone.trim();s
    }).length;

}

$scope.ispasswordChange = function(ev){
    if(ev == 'pass'){ $rootScope.isPassChange = false;}else{ $rootScope.isPassChange = true;}
  return ev;
 }

 $scope.pushGeneratePass = function(values){
    $scope.cache.details_ = null
    // if(angular.isUndefined(values.pass_word)) return 0;
     Data.post('checkpassword',{
         profile: values
     }).then(function(results){
         alert(results);
       $scope.cache.details_ = results
    });
}

$scope.updProfile =function(profile){
  
    $scope.cache.profileSaving= true;
      Data.post('updprifile',data).then(function(results){
          Data.toast(results);
          $rootScope.userDetails = profile
          $scope.cache.profileSaving= false;
          $scope.loadusers();
 });
}

//Change  user password
$scope.changePassword =function(profile){
$scope.cache.passSaving= true;
 Data.post('updPass',{
     profile:profile
    }).then(function(results){
      Data.toast(results);
      $rootScope.isServerDown=false;
    $scope.cache.passSaving= false;
    $rootScope.userDetails_ = profile  
    $scope.userDetails_.r_password = null
    $scope.userDetails_.pass_word = null
});

}

$scope.onInitLoad = function(){
    Data.post('onInitLoad').then(function (results) {
    });
}

$scope.allSponsorByID = function(str){
    Data.post('loadSponsor',{
        id : vID
    }).then(function (results) {
        $scope.cache.max_thread_number = results;
        $scope.loadAllSponsor(limit);
    });
}

$scope.allSponsorByIDs = function(str){
    Data.post('loadSponsor',{
        id : str
    }).then(function (results) {
        $scope.cache.max_thread_number = results;
        $scope.loadAllSponsor(limit);
    });
}

window.onload = function(){
    if($rootScope.cache.accountDetails.uid){
        $scope.filterByID($rootScope.cache.accountDetails.uid);
        $scope.loadMyteam($rootScope.cache.accountDetails.uid)
        $location.path('dashboard');
        $rootScope.authenticated = true;
    }else{
        $location.path('login');
        $rootScope.authenticated = false;
    }
}

$scope.loadMyteam = function(str){
    $scope.cache.isLoadingTeam = true
    $scope.cache.myteam=[]
    Data.post('loadMyteam',{
        id : str
    }).then(function (results) {
        $scope.cache.isLoadingTeam = false
        $scope.cache.myteam = results;
    });
   }

$scope.uniqueUsers = function(name){
    $scope.cache.unifyUsername = $scope.cache.allsponsors.filter(function(obj){
       return obj.username.trim() == name.toLowerCase().trim()
    }).length;
}

$scope.uniquePhone = function(phone){
    $scope.cache.unifyPhone = $scope.cache.allsponsors.filter(function(obj){
       return obj.phone.trim() == phone.trim();s
    }).length;

}

$scope.ispasswordChange = function(ev){
    if(ev == 'pass'){ $rootScope.isPassChange = false;}else{ $rootScope.isPassChange = true;}
  return ev;
 }


$scope.pushDetails = function(values){
    $scope.cache.details_ = null
    if(angular.isUndefined(values.pass_word)) return 0;

     Data.post('check_pass_word',values).then(function(results){
       $scope.cache.details_ = results
    });
}

$scope.hideModal = function(md){
    $(md).modal('toggle'); 
  }

$scope.changeProfile =function(profile){
    $scope.cache.profileSaving= true;
    var data = {profile:profile,new_reg:'1'}
      Data.post('updUser',data).then(function(results){
          Data.toast(results);
          $scope.cache.profileSaving= false;
 });
}

$scope.changeDelete =function(profile){
    $scope.cache.profileDeleting= true;
     var data = {profile:profile}
      Data.post('deleteSponsor',data).then(function(results){
          Data.toast(results);
          $scope.cache.profileDeleting= false;
          $scope.loadAllSponsors(limit);
 });
}

//Change  user password
$scope.changePassword =function(profile){
$scope.cache.passSaving= true;
 Data.post('updPass',profile).then(function(results){
    Data.toast(results);
    $rootScope.isServerDown=false;
    $scope.cache.passSaving= false;
    $rootScope.userDetails = profile  
    $scope.userDetails.r_password = null
    $scope.userDetails.pass_word = null
  });

}

$scope.feesCalculations = function(fees,sp,spArray){
    var feeFormlar = 0
    $scope.cache.newArray = [],sum=0;
      if(sp.uid==1){
            feeFormlar += (100/100)*parseFloat(tonumberformat(fees));
      }else{
        for(var i in spArray){
            if(spArray[i].uid==1){
                feeFormlar += (100/100)*parseFloat(tonumberformat(fees));
              }else{
                feeFormlar += (40/100)*parseFloat(tonumberformat(fees));
            }
            var totalB = parseFloat(spArray[i].balance)+parseFloat(feeFormlar);
            sum = {balance: totalB,uid:spArray[i].uid}
        }
        $scope.cache.newArray.push(sum);
    }


} 

$scope.sumValues= function(v,v1){
    var sum = 0
       sum += parseFloat(tonumberformat(v)) + parseFloat(tonumberformat(v1))
       $scope.cache.payments.balance = moneyValue(sum);
    return sum;
}

function tonumberformat (n){
    return n.toString().replace(/[^0-9/-/.]/g,'')
}

function moneyValue(value){
    return value.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

$scope.onInitLoad();

})

.controller('numberFormatCtrl', function($scope) {
    $scope.onCreditCardTypeChanged = function(type) {
        $scope.model.creditCardType = type;
    };

    $scope.model = {
        rawValue: ''
    };

    $scope.options = {
        creditCard: {
            creditCard: true,
            onCreditCardTypeChanged: $scope.onCreditCardTypeChanged
        }
    };

    $scope.options = {
        numeral: {
            numeral: true,
                    numeralThousandsGroupStyle: 'thousand'
        },
    };


    // var cleave = new Cleave('.input-element', {
    //     prefix: 'PREFIX',
    //     delimiter: '-',
    //     blocks: [6, 4, 4, 4],
    //     uppercase: true
    // });
    //    
    //    document.getElementById("clickBtnID").onclick=
    //    function(){
    //        var url = "/assets/login/index.html";
    //        window.location.href= (url);
    //     }

        // $(document).ready(function (){
        //     swal({
        //         title: 'error',
        //         text: '',
        //         type: 'warning',
        //         showCancelButton: 'yes',
        //         confirmButtonColor: 'blue',
        //         confirmButtonText: 'yes',
        //         cancelButtonText: 'no',

        //     }).then()   
        // });
    
   
});