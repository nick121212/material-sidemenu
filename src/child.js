
angular.module('sidemenu')
    .directive('sideMenuChild', [function () {
        var directive = {
            restrict: 'EA',
            require: '^sideMenu',
            link: ($scope, $element, $attrs, $ctrl)=> {
                $scope['showSearchBar'] = false;
                $ctrl['template']($scope, function (clone) {
                    $element.html('').append(clone);
                });
            }
        };

        return directive;
    }]);