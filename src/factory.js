
angular.module('sidemenu')
    .factory('mdSideMenuFactory', ['$rootScope', 'mdSideMenuSections', function ($rootScope,mdSideMenuSections) {
        var onStateChangeStart = function (event, toState, toParams) {
            function digest(sections, currentSection) {
                sections.forEach(function (section) {
                    if (section[mdSideMenuSections.options.children] && section[mdSideMenuSections.options.children]) {
                        return digest(section[mdSideMenuSections.options.children], section);
                    }

                    if (section.menuLink == location.hash) {
                        mdSideMenuSections.selectedNode = section;
                    }
                });

                return false;
            }

            digest(mdSideMenuSections.sections, null);
        };

        $rootScope.$on('$locationChangeSuccess', onStateChangeStart);

        return {
            onStateChangeStart: onStateChangeStart
        };
    }]);