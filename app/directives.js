app.directive('focus', function() {
    return function(scope, element) {
        element[0].focus();
    }      
});

app.directive('passwordMatch', [function () {
    return {
        restrict: 'A',
        scope:true,
        require: 'ngModel',
        link: function (scope, elem , attrs,control) {
            var checker = function () {
 
                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel); 
 
                //get the value of the other password  
                var e2 = scope.$eval(attrs.passwordMatch);
                if(e2!=null)
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {
 
                //set the form control to valid if both 
                //passwords are the same, else invalid
                control.$setValidity("passwordNoMatch", n);
            });
        }
    };
}]);

app.directive('onlyDigits', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
         link: function (scope, element, attrs, modelCtrl) {
           modelCtrl.$parsers.push(function (inputValue) {
               if (inputValue == undefined) return '';
               var transformedInput = inputValue.replace(/[^0-9/-/,.]/g, '');
               if (transformedInput !== inputValue) {
                   modelCtrl.$setViewValue(transformedInput);
                   modelCtrl.$render();
               }
               return transformedInput;
           });
       }
   };
})

.directive('removeQoutes', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
         link: function (scope, element, attrs, modelCtrl) {
           modelCtrl.$parsers.push(function (inputValue) {
               if (inputValue == undefined) return '';
               var transformedInput = inputValue.replace(/['/"]/g, '');
               if (transformedInput !== inputValue) {
                   modelCtrl.$setViewValue(transformedInput);
                   modelCtrl.$render();
               }
               return transformedInput;
           });
       }
   };
})

app.filter('eachword', function () {
    return function (s) {
        s = (s === undefined || s === null) ? '' : s;
        return s.toString().toLowerCase().replace(/\b([a-z])/g, function (ch) {
            return ch.toUpperCase();
        });
    };
});

app.filter('sumByKey', function() {
    return function(data, key) {
        if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
            return 0;
        }

        var sum = 0;
        for (var i = data.length - 1; i >= 0; i--) {
            sum += parseInt(data[i][key]);
        }

        return sum;
    };
});
// app.directive('pwCheck', [function () {
//     return {
//       require: 'ngModel',
//       link: function (scope, elem, attrs, ctrl) {
//         var firstPassword = '#' + attrs.pwCheck;
//         elem.on('keyup', function () {
//           scope.$apply(function () {
//             var v = elem.val()===$(firstPassword).val();
//             ctrl.$setValidity('pwmatch', v);
//           });
//         });
//       }
//     }
//   }]);

//   app.directive('pwCheck', [function () {
//     return {
// 		require: 'ngModel',
// 		link: function (scope, elem, attrs, ctrl) {
// 			scope.$watch(attrs.pwCheck, function (confirmPassword) {
//     			var isValid = ctrl.$viewValue === confirmPassword;
//     			ctrl.$setValidity('pwmatch', isValid);
//             });
// 		}
// 	}
//   }]);
app.filter('sumOfValue', function () {
return function (data, key) {        
    if (angular.isUndefined(data) || angular.isUndefined(key))
        return 0;        
    var sum = 0;        
    angular.forEach(data,function(value){
        sum = sum + parseInt(value[key], 10);
    });        
    return sum;
}
})

.filter('totalSumPriceQty', function () {
return function (data, key1, key2) {        
    if (angular.isUndefined(data) || angular.isUndefined(key1)  || angular.isUndefined(key2)) 
        return 0;        
    var sum = 0;
    angular.forEach(data,function(value){
        sum = sum + (parseInt(value[key1], 10) * parseInt(value[key2], 10));
    });
    return sum;
}
})

.filter('totalSumPlus', function () {
return function (data, key1, key2) {        
    if (angular.isUndefined(data) || angular.isUndefined(key1)  || angular.isUndefined(key2)) 
        return 0;        
    var sum = 0;
    angular.forEach(data,function(value){
        sum = sum + (parseInt(value[key1], 10) + parseInt(value[key2], 10));
    });
    return sum;
}
})

.filter('totalSumMin', function () {
return function (data, key1, key2) {        
    if (angular.isUndefined(data) || angular.isUndefined(key1)  || angular.isUndefined(key2)) 
        return 0;        
    var sum = 0;
    angular.forEach(data,function(value){
        sum = sum + (parseInt(value[key1], 10) - parseInt(value[key2], 10));
    });

    if(sum < 0) {sum = 0}
    return sum;
}
})

.filter('totalSumPlusDivide', function () {
return function (data, key1, key2,key3) {        
    if (angular.isUndefined(data) || angular.isUndefined(key1)  || angular.isUndefined(key2) || angular.isUndefined(key3)) 
        return 0;        
    var sum = 0;
    angular.forEach(data,function(value){
        sum = sum + (parseInt(value[key1], 10) / parseInt(value[key2], 10)) +parseInt(value[key3], 10);
    });
    return sum;
}
})
.filter('totalSumDivide', function () {
return function (data, key1, key2) {        
    if (angular.isUndefined(data) || angular.isUndefined(key1)  || angular.isUndefined(key2)) 
        return 0;        
    var sum = 0;
    angular.forEach(data,function(value){
        sum = sum + (parseInt(value[key1], 10) / parseInt(value[key2], 10));
    });
    return sum;
}
})

.filter('totalSumPlusDivide2', function () {
return function (data, key1, key2,key3 ,key4) {        
    if (angular.isUndefined(data) || angular.isUndefined(key1)  || angular.isUndefined(key2) || angular.isUndefined(key3) || angular.isUndefined(key4)) 
        return 0;        
    var sum = 0;
    angular.forEach(data,function(value){
        sum = sum + (parseInt(value[key1], 10) / parseInt(value[key2], 10));
        sum = sum + (parseInt(value[key3], 10) / parseInt(value[key2], 10)) 
        sum = sum +  parseInt(value[key4], 10);
    });
    return sum;
}
})

.filter('removeMinus' , function(){
return function(str){
    return str.replace(/-/g, ' ');
}
})
.directive('tab', function() {
    return {
     restrict: 'E',
     transclude: true,
     template: '<div role="tabpanel" ng-show="active" ng-transclude></div>',
     require: '^tabset',
     scope: {
       heading: '@'
     },
     link: function(scope, elem, attr, tabsetCtrl) {
       scope.active = false
       tabsetCtrl.addTab(scope)
   
     }
   }
   })
   .directive('tabset', function() {
     return {
       restrict: 'E',
       transclude: true,
       template: '<div role="tabpanel">'
          +'<ul class="nav nav-pills nav-stacked" role="tablist" style="width:30%">'
          +'<li role="presentation"'
          +'ng-repeat="tab in tabset.tabs"  ng-class={"active": tab.active}>'
          +'<a href="" role="tab" ng-click="tabset.select(tab)">{{tab.heading}}</a></li>'
          +'</ul>'
          +'<div style="position:absolute; left:35%;top:25%;width:50%"><ng-transclude> </ng-transclude></div>'
          +'</div>',
       bindToController: true,
       controllerAs: 'tabset',
       controller : function(){
        var self = this;
        self.tabs = [];
   
           self.addTab = function addTab(tab){
               self.tabs.push(tab);
               if(self.tabs.length === 1){
                 tab.active = true;
               }
           }
           self.select = function(selectedTab){
              angular.forEach(self.tabs,function(tab){
                 if(tab.active && tab !=selectedTab){
                     tab.active = false;
                 }
              });
              selectedTab.active = true;
           }
       }  
     }
   })
