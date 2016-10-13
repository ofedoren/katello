/**
 * @ngdoc object
 * @name  Bastion.content-hosts.controller:ContentHostPackagesApplicableController
 *
 * @requires $scope
 * @resource $timeout
 * @resource $window
 * @requires Package
 * @requires HostPackage
 * @requires translate
 * @requires Nutupane
 *
 * @description
 *   Provides the functionality for the content host packages list and actions.
 */
angular.module('Bastion.content-hosts').controller('ContentHostPackagesApplicableController',
    ['$scope', '$timeout', '$window', 'Package', 'HostPackage', 'translate', 'Nutupane',
    function ($scope, $timeout, $window, Package, HostPackage, translate, Nutupane) {
        var packagesNutupane, openEventInfo;

        $scope.getSelectedPackages = function () {
            var selected = $scope.detailsTable.getSelected();
            selected = _.map(selected, function(pkg) {
                return pkg.name + '-' + pkg.version + '-' + pkg.release + '.' + pkg.arch;
            });
            return selected;
        };

        $scope.getRemoteExecutionCommand = function() {
            return $scope.getSelectedPackages().join(' ');
        };

        $scope.getKatelloAgentCommand = function () {
            return $scope.getSelectedPackages().join(',');
        };

        $scope.performDefaultUpdateAction = function () {
            if ($scope.remoteExecutionByDefault) {
                $scope.performViaRemoteExecution('packageUpdate', $scope.getRemoteExecutionCommand(), false);
            } else {
                $scope.performViaKatelloAgent('packageUpdate', $scope.getKatelloAgentCommand());
            }
        };

        packagesNutupane = new Nutupane(Package, {'host_id': $scope.$stateParams.hostId, 'packages_restrict_upgradable': true});
        packagesNutupane.masterOnly = true;
        $scope.detailsTable = packagesNutupane.table;
        $scope.detailsTable.openEventInfo = openEventInfo;
        $scope.detailsTable.contentHost = $scope.contentHost;
    }
]);
