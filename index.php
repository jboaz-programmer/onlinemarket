<!DOCTYPE html>
<html lang="en" ng-app="myApp">
  <head>
    <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1">
          <title>F E D S NETWORK</title>
          <!-- Bootstrap -->
          <link href="assets/css/bootstrap.min.css" rel="stylesheet">
            <link href="assets/css/style.css" rel="stylesheet">
             <link href="assets/css/font-awesome.css" rel="stylesheet" />
              <link href="assets/css/toaster.css" rel="stylesheet">
              <link href="js//select2/css/select2.min.css" rel="stylesheet">
                <style>
                  a {
                  color: orange;
                  }
                </style>   
                               
  </head>

  <body ng-controller="authCtrl" ng-cloak="" ng-init="activePage('dashboard')">
  <header>
        <div class="container">
            <div class="row">
            </div>
        </div>
    </header>
    <!-- HEADER END-->
    <div class="navbar navbar-inverse set-radius-zero" >
        <div class="container">
            <div class="navbar-header">
                <button type="button" ng-show="authenticated" style="position:adsolute" class="navbar-toggle btn-sm" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand " href="">
                    <img src="assets/img/logo.png" />
                </a>

            </div>

            <div class="left-div" ng-show="!authenticated">
                <i class="fa fa-user-plus login-icon f14 pull-right" style="font-size:30px;margin-top:-em"></i>
            </div>

            <div class="left-div" ng-show="authenticated">
                <div class="user-settings-wrapper">
                    <ul class="nav">

                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" href=""  aria-expanded="false">
                                <span class="glyphicon glyphicon-user" style="font-size: 25px;"></span>
                            </a>
                            <div class="dropdown-menu dropdown-settings">
                                <div class="media">
                                    <a class="media-left" href="">
                                        <img src="assets/img/avatar.jpg" alt="" class="img-rounded" />
                                    </a>
                                    <div class="media-body">
                                        <h4 class="media-heading"> {{name}}</h4>
                                        <h5>{{role}}</h5>

                                    </div>
                                </div>
                                <!-- <hr />
                                <h5><strong>Personal Bio : </strong></h5> -->
                                
                                <hr />
                                <a href="#/myprofile"  class="btn btn-info btn-sm">Full Profile</a>&nbsp; <a href="#/login" ng-click="logout()" class="btn btn-danger btn-sm">Logout</a>

                            </div>
                        </li>


                    </ul>
                      
             <div class="pull-right" style="margin-top:-2.5em"  ng-show="authenticated">
             <div class="dropdown">
               <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
                <span class="glyphicon glyphicon-cog"></span>
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                <li role="presentation" ><a role="menuitem" tabindex="-1" href="" ng-click="clearPayments_s();clearPayments('Fees Payments');" data-toggle="modal" data-target="#paymentsModal">Fees Payment</a></li>
                <li role="presentation" ng-show="authenticated && uid==1"><a role="menuitem" tabindex="-1" href="" ng-click="clearPayments('Transactions History')" data-toggle="modal" data-target="#historyModal">All transactions</a></li>
                <li role="presentation" ng-click="clickedPage('company')" ng-show="uid==1"><a role="menuitem" tabindex="-1" href="#/campany">Company Profile</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#/mywallet">My Wallet</a></li>
                <li role="presentation"><a  ng-click="logout()" href="#/login">Logout</a></li>
            </ul>
            </div>
                </div>
        </div>
            </div>
        </div>
    </div>

    <!-- {{cache.sponsor_data}} -->

    <!-- LOGO HEADER END-->
    <section class="menu-section" ng-show="authenticated">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="navbar-collapse collapse ">
                        <ul id="menu-top" class="nav navbar-nav navbar-right">
                            <li ng-click="activePage('dashboard')"><a  href="#/dashboard"  ng-class="{'m_active':activeViewPage=='dashboard'}">Dashboard</a></li>
                            <li ng-show="uid==1" ng-click="activePage('allmember');loadAllSponsors('50')" ng-class="{'m_active':activeMenu('allmember')=='allmember'}"><a href="#/allmembers">All members</a></li>
                            <li><a href="#/mywallet" ng-click="activePage('wallet');" ng-class="{'m_active':false}">My Wallet</a></li>
                            <li><a href="#/comments" ng-click="activePage('comment');" ng-class="{'m_active':false}">Comments</a></li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </section>
    <div class="content-wrapper">
        <div data-ng-view="" id="ng-view" class="slide-animation">
        <div class="text-center"> <span> <i class="fa fa-spinner fa-spin f14"></i>  </span>  Please Wait! loading data..... </div>

        </div>
        <div ng-include="'templates/modals/allmodals.html'"></div>

    </div>
        <div class="col-md-4 col-sm-4 col-lg-4" style="position:absolute;top:5em;left:50%" ng-show="authenticated && cache.sponsor_data[0].status=='0'">
                <div class="alert alert-warning">
                    Please! activate your account <span class="btn btn-default pull-right" ng-click="clearPayments_s();clearPayments('Fees Payments');" data-toggle="modal" data-target="#paymentsModal">Click Here</span>
                </div>
        </div>

      <footer >
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    &copy; 2020 jimmyTechnologies  | By : <a href="#" target="_blank">jtechnology</a>
                </div>

            </div>
        </div>
    </footer>
    </body>
  <toaster-container toaster-options="{'time-out': 3000}"></toaster-container>
  <!-- Libs -->
 
  <script src="js/angular.min.js"></script>
  <script src="js/angular-route.min.js"></script>
  <script src="js/angular-animate.min.js" ></script>
  <script src="js/toaster.js"></script>
  <script src="app/app.js"></script>
  <script src="app/data.js"></script>
  <script src="app/directives.js"></script>
  <script src="app/authCtrl.js"></script>
  <script src="js/cleave.js/dist/cleave-angular.min.js"></script>
  <script src="js/cleave.js/dist/addons/cleave-phone.tz.js"></script>
  

  <script src="js/jquery-1.11.1.js"></script>
  <script src="js/bootstrap.js"></script>
  <script src="js/select2/js/select2.min.js"></script>

</html>

