
angular.module('sidemenu')
    .directive('sideMenuContentTransclude', [function () {
        var directive = {
            link: function($scope, $element, $attrs, $ctrl) {
                $scope['$sideMenuTransclude']($scope, function (clone) {
                    $element.empty();
                    $element.append(clone);
                });
            }
        };

        return directive;
    }]);