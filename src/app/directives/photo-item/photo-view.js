(function (angular) {
  'use strict';

  angular.module('angularMaterialFormBuilder')
    .directive('photoView', PhotoView);

  /*@ngInject*/
  function PhotoView($timeout) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/photo-item/photo-view.html',
      scope: {
        formItem: '=',
        form: '='
      },
      controller: PhotoViewCtrl,
      controllerAs: 'vm',
      bindToController: true,
      link: linker
    };

    function linker(scope, elem, attrs, ctrl) {

      //this timeout is placed here in order to make sure that the creator directive of this view is finished its work
      $timeout(function() {
        ctrl.init();
      }, 50);
    }

    return directive;
  }

  /*@ngInject*/
  function PhotoViewCtrl(Utils, fileUploadService) {
    this.Utils = Utils;
    var vm = this;

    vm.uploadFile = function(){
            vm.file_uploaded = false;
            var file = vm.myFile;
            console.log('file is ' );
            console.dir(vm.upload_url);
            var uploadUrl = vm.upload_url;
            fileUploadService.uploadFileToUrl(file, uploadUrl).then(function(data)
            {
                console.log(data);
                vm.blob_key = data.key;
                vm.formItem.value = vm.blob_key;
                vm.file_uploaded = true;
            });


        };

        vm.removeBlob = function()
        {
            fileUploadService.deleteBlob(vm.blob_key).then(function(data)
            {
                console.log(data);
                vm.file_uploaded = false;
                vm.getUploadUrl();
                vm.field.field_value = "";
            })
        }

        vm.getUploadUrl = function()
        {

        fileUploadService.getUploadUrl().then(function(data)
        {
		vm.upload_url = data;
                console.log(data);
        
	});

        }
        vm.getUploadUrl();
  }



  PhotoViewCtrl.prototype.init = function () {

    this.Utils.extend(this.formItem, {
      config: {}
    });
  };


})(angular);
