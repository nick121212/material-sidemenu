
angular.module('sidemenu', ['ngMaterial'])
    .directive('sideMenu', ['$rootScope', '$compile', 'mdSideMenuSections', function ($rootScope, $compile, mdSideMenuSections) {
        var directive = {
            restrict: 'EA',
            replace: false,
            require: 'sideMenu',
            transclude: true,
            scope: {
                modules: '=',
                selectedNodes: '=',
                orderBy: "@",
                reverseOrder: "@"
            },
            controller: ['$scope', '$interpolate','$templateCache', function ($scope, $interpolate,$templateCache) {
                var opts = mdSideMenuSections.options;

                $scope.options = opts;
                !$scope.selectedNodes && ($scope.selectedNodes = {});
                $scope.showChildren = function(node) {
                    if ($scope.selectedNodes.hasOwnProperty(node[opts.key])) {
                        delete $scope.selectedNodes[node[opts.key]];
                    } else {
                        if (node[opts.children] && node[opts.children].length) {
                            $scope.selectedNodes[node[opts.key]] = node;
                        }
                    }
                };
                $scope.isShowChildren = function (node) {
                    return $scope.selectedNodes[node[opts.key]];
                };
                $scope.isLeaf = function (node) {
                    return node.rgt - node.lft == 1 || node[opts.children].length == 0;
                };
                $scope.isSelected = function (node) {
                    return !!mdSideMenuSections.selectedNode && mdSideMenuSections.selectedNode[opts.key] == node[opts.key];
                };
                this.template = $compile($interpolate($templateCache.get('sidemenu.html'))({
                    opts: opts
                }));
            }],
            compile: ($ele, $attrs, childTranscludeFn)=> {
                return ($scope, $element, attrs, $ctrl)=> {
                    $scope.$watch("modules", function updateNodeOnRootScope(newValue) {
                        var opts = mdSideMenuSections.options;
                        if (angular.isArray(newValue)) {
                            if (angular.isDefined($scope.node) && angular.equals($scope.node[opts.children], newValue))
                                return;
                            $scope.node = {};
                            $scope.node[opts.children] = newValue;
                        }
                        else {
                            if (angular.equals($scope.node, newValue))
                                return;
                            $scope.node = newValue;
                        }
                    });
                    $ctrl.template($scope, function (clone) {
                        $element.html('').append(clone);
                    });
                    $scope.$sideMenuTransclude = childTranscludeFn;
                }
            }
        };

        return directive;
    }]);