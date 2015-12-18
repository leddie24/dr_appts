var myApp = angular.module('mean_app', ['angularMoment', 'ngStorage', 'ui.router', 'ui.router.stateHelper']);

myApp.config(function ($urlRouterProvider, stateHelperProvider) {
   stateHelperProvider
      .state({
         name: 'login',
         url: '/',
         templateUrl: './partials/login.html',
         controller: 'loginController as lc'
      })
      .state({
         name: 'dashboard',
         templateUrl: './partials/dashboard_tmpl.html',
         controller: 'dashboardController as dc',
         children: [
         {
            name: 'main',
            url: '/dashboard',
            templateUrl: './partials/dashboard.html'
         },
         {
            name: 'appt',
            url: '/appt',
            templateUrl: './partials/appointment.html',
            controller: 'appointmentController as ac',
         }]
      });

      $urlRouterProvider.otherwise('/');
});