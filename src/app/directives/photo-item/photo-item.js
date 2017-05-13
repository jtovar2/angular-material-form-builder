(function (angular) {
  'use strict';

  angular.module('demoDocFormBuilder')
    .directive('photoItem', PhotoItem);

  function PhotoItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/photo-item/photo-item.html',
      scope: {
        item: '='
      },
      controller: PhotoItemCtrl,
      controllerAs: 'PhotoItem',
      bindToController: true
    };

    return directive;
  }

  /*@ngInject*/
  function PhotoItemCtrl(Utils, $element) {
    this.Element = $element;

    Utils.extend(this.item, {
      config: {
        type: 'text'
      }
    });
  }

})(angular);
