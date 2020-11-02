var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster', 'cleave.js']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/login', {
                title: 'Login',
                templateUrl: 'templates/login.html',
                controller: 'authCtrl'
            })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'templates/login.html',
                controller: 'logoutCtrl'
            })
            .when('/signup', {
                title: 'Signup',
                templateUrl: 'templates/signup.html',
                controller: 'authCtrl'
            })
            .when('/dashboard', {
                title: 'Dashboard',
                templateUrl: 'templates/dashboard.html',
                controller: 'authCtrl'
            })
            .when('/mywallet', {
                title: 'My wallet',
                templateUrl: 'templates/mywillet.html',
                controller: 'authCtrl'
            })
            .when('/comments', {
                title: 'Comments',
                templateUrl: 'templates/comments.html',
                controller: 'authCtrl'
            })
            .when('/campany', {
                title: 'Company profile',
                templateUrl: 'templates/company.html',
                controller: 'authCtrl'
            })
            .when('/myprofile', {
                title: 'My Profile',
                templateUrl: 'templates/myprofile.html',
                controller: 'authCtrl'
            })
            .when('/allmembers', {
                title: 'All members',
                templateUrl: 'templates/allmembers.html',
                controller: 'authCtrl'
            })
            .when('/', {
                title: 'Login',
                templateUrl: 'templates/login.html',
                controller: 'authCtrl',
                role: '0'
            })
            .otherwise({
                redirectTo: '/login'
            });
    }])
    .run(function ($rootScope, $location, Data) {
        $rootScope.cache = { myteam: [], sponsorG_data: [], statusActive: [], status: [], threadsGroups: [], payments: { number: '+255', amount: 0, balance: 0, newArray: [] } };
        $rootScope.cur_date = new Date();

        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
            Data.get('session').then(function (results) {
                if (results.uid) {
                    $rootScope.cache.accountDetails = results
                    $rootScope.authenticated = true;
                    $rootScope.uid = results.uid;
                    $rootScope.name = results.name;
                    $rootScope.email = results.email;
                } else {
                    var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '/signup' || nextUrl == '/login') {
                        // Data.get('logout').then(function (results) {});
                        $rootScope.authenticated = false;
                    } else {
                        $location.path("/login");
                        // Data.get('logout').then(function (results) {});
                        $rootScope.authenticated = false;
                    }
                }
            });

        });

        $rootScope.LNG = function (ksw, eng) {
            if ($rootScope.cache.lnguage == 'KISWAHILI') { return ksw }
            else { return eng }
        }

        $rootScope.clearPayments_s = function () {
            $rootScope.cache.payments = { number: '+255', amount: 0, balance: 0 }
        }

        $rootScope.clearPayments = function (t) {
            if (t == 'Fees Payments') {
                $rootScope.cache.payTitle = t
            } else {
                $rootScope.cache.payTitle = t
            }
        }

        $rootScope.clickedPage = function (page) {
            $rootScope.isLoading = false
            if (page != '' || typeof (page) != undefined) { $rootScope.ChildViewPage = page; return true } else { console.log('Page not found'); return false; }
        }
        $rootScope.clickedPageST = function (page) {
            $rootScope.isLoading = false
            if (page != '' || typeof (page) != undefined) { $rootScope.ChildViewPageST = page; return true } else { console.log('Page not found'); return false; }
        }

        $rootScope.activePage = function (page) {
            $rootScope.isLoading = false
            if (page != '' || typeof (page) != undefined) { $rootScope.activeViewPage = page; return true } else { console.log('Page not found'); return false; }
        }

        $rootScope.activeMenu = function (page) {
            $rootScope.isLoading = false
            if (page != '' || typeof (page) != undefined) { $rootScope.activeViewPage = page; return true } else { console.log('Page not found'); return false; }
        }

        $rootScope.clickedPageDS = function (page) {
            $rootScope.isLoading = false
            if (page != '' || typeof (page) != undefined) { $rootScope.ChildViewPageDS = page; return true } else { console.log('Page not found'); return false; }
        }
        $rootScope.goBack = function (go) {
            return go == true ? $rootScope.cache.showHosts = false : $rootScope.cache.showHosts = true;
        }
        $rootScope.hidePageNotClicked = function (clickedPage) {
            if ($rootScope.ChildViewPage == clickedPage) { return true } else { return false }
        }
        $rootScope.hidePageNotClickedST = function (clickedPage) {
            if ($rootScope.ChildViewPageST == clickedPage) { return true } else { return false }
        }
        $rootScope.hidePageNotClickedDS = function (clickedPage) {
            if ($rootScope.ChildViewPageDS == clickedPage) { return true } else { return false }
        }

        $rootScope.totime = function () {
            return new Date().toLocaleTimeString();
        }

        $rootScope.c_totime = function (time) {
            return new Date(time).toLocaleTimeString();
        }

        $rootScope.c_date = function (d) {
            return new Date(d).toDateString();
        }

        $rootScope.c_round = function (amt) {
            return Math.round(amt);
        }

        $rootScope.hideShowModal = function (md) {
            $(md).modal('toggle');
        }
        $rootScope.removeQoute = function (value) {
            return value.replace(/[']/g, " ")
        }

        $rootScope.print = function (cmp) {
            var contents = document.getElementById(cmp).innerHTML;
            var frame1 = document.createElement('iframe');
            frame1.name = "frame3";
            frame1.style.position = "absolute";
            frame1.style.top = "-1000000px";
            document.body.appendChild(frame1);
            var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
            frameDoc.document.open();
            frameDoc.document.write('<html><head> <style> table,tr th,td{border:1px solid #eee;font-size:11px} .salt-print{display: block} .pdf-path, .input-sm , button{display:none}.invoice-box{max-width:800px;margin:auto;padding:3px;border:1px solid #eee;box-shadow:0 0 10px rgba(0,0,0,.15);font-size:12px;line-height:13px;color:#555}.invoice-box table{width:100%;line-height:inherit;text-align:left}.invoice-box table td{padding:1px;vertical-align:top}.invoice-box table tr td:nth-child(2){text-align:left}.invoice-box table tr.top table td{padding-bottom:10px}.invoice-box table tr.top table td.title ,th.title{font-size:14px;line-height:14px;color:#333}.invoice-box table tr.information table td{padding-bottom:10px}.invoice-box table tr.heading td{background:#eee;border-bottom:1px solid #ddd;font-weight:700}.invoice-box table tr.details td{padding-bottom:10px}.invoice-box table tr.total td{border-top:2px solid #eee;padding:10px;font-weight:700} </style>');
            frameDoc.document.write('</head><body>');
            frameDoc.document.write(contents);
            frameDoc.document.write('</body></html>');
            frameDoc.document.close();
            setTimeout(function () {
                window.frames["frame3"].focus();
                window.frames["frame3"].print();
                document.body.removeChild(frame1);
            }, 500);
            return false;
            //window.print();
        }

        $rootScope.getDetailsOnEdit = function (oldData, newData, array) {
            var index = array.lastIndexOf(oldData);
            if (index === -1) {
                var newArray = { name: oldData, desc: newData, status: 1, doneBy: $rootScope.loginDetails[0].username }
                array.push(newArray);
            }
            return array
        }
    });