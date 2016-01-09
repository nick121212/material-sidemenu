angular.module('sidemenu')
    .directive('sideMenuSearch', ['mdSideMenuSections', '$templateCache', function (mdSideMenuSections, $templateCache) {
        var directive = {
            restrict: 'EA',
            template: $templateCache.get('sidemenu_search.html'),
            controller: function($scope) {
                $scope.options = mdSideMenuSections.options;
            }
        };

        return directive;
    }]);