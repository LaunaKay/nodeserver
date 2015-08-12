<html ng-app='appCustomers'>
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.1/angular.min.js"/></script>
    <link href="http://netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">
    <!-- jQuery -->
        <script src="http://code.jquery.com/jquery.js"></script>
        <!-- Bootstrap JavaScript -->
        <script src="http://netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>

    <script type='text/javascript'>
    console.log('inside script');

    var app = angular.module('appCustomers', ['ngRoute']);

    app.config(function,($routeProvider)
    {
        $routeProvider
            .when('/',
            {
                templateUrl: 'partials/customers.html'
            })
            .when('/partial2',
            {
                templateUrl:'partials/orders.html'
            })
            .otherwise(
            {
                redirectTo: '/'
            });
    });

    app.controller('customerController', function($scope, customerFactory)
    {
        console.log('inside controller');
        $scope.customers = [];
        $scope.addDuplicate = false;

        customerFactory.returnCustomers(function(customerData)
        {
            $scope.customers = customerData;
            console.log($scope.customers);

            $scope.addCustomer = function(newCustomer)
            {
                console.log('inside addCustomer');
                console.log('newCustomer', $scope.newCustomer);

                for(var i = 0; i<$scope.customers.length; i++)
                {
                    if ($scope.customers[i].name == $scope.newCustomer.name)
                    {
                        console.log('inside if');
                        $scope.addDuplicate = true;
                        $scope.toggle = function()
                        {
                            $scope.addDuplicate = !$scope.addDuplicate
                        };
                        $scope.newCustomer = {};
                        return;
                    };
                };
                console.log($scope.newCustomer);
                $scope.customers.push($scope.newCustomer);
                console.log($scope.customers);
                $scope.newCustomer = {};
            }

            $scope.deleteCustomer = function(customer)
            {
                console.log('inside delete', customer);
                $scope.customers.splice($scope.customers.indexOf(customer),1);
            }
        });
    });

 app.controller('orderController', function($scope, customerFactory)
 {




 });
        app.factory('customerFactory', function()
        {
            console.log('inside factory');
            var customers = [
                {name:'Michael Choi', created:'June 24, 2015'},
                {name:'John Supsupin', created:'June 20, 2015'},
                {name:'Trey Villafane', created:'June 19, 2015'},
                {name:'India Meisner', created:'June 20, 2015'},
            ]
            var factory = {};

            factory.returnCustomers = function(cbGetData)
            {
                console.log('inside factory.return');
                cbGetData(customers);
            };
            return factory;
        });
    </script>
  </head>
  <body>
    <div ng-app='app'>
        <a href='#/'>Customers</a> | <a href='#/'>Orders</a>
        <div ng-view=''>
        </div>
    </div>
</body>
</html>

