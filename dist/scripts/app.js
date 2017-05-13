(function (angular) {
  'use strict';

  angular
    .module('demoDocFormBuilder', ['ngMaterial', 'angular-sortable-view', 'ngMessages']);

})(angular);

(function (angular) {
  'use strict';

  angular.module('demoDocFormBuilder')
    .directive('textareaView', TextareaView);

  /*@ngInject*/
  function TextareaView($timeout) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/textarea-item/textarea-view.html',
      scope: {
        formItem: '=',
        form: '='
      },
      controller: TextareaViewCtrl,
      controllerAs: 'TextareaView',
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
  function TextareaViewCtrl(Utils) {
    this.Utils = Utils;
  }

  TextareaViewCtrl.prototype.init = function () {

    this.Utils.extend(this.formItem, {
      config: {}
    });
  };


})(angular);

(function (angular) {
  'use strict';

  angular.module('demoDocFormBuilder')
    .directive('textareaItem', textareaItem);

  function textareaItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/textarea-item/textarea-item.html',
      scope: {
        item: '='
      },
      controller: TextareaItemCtrl,
      controllerAs: 'Textarea',
      bindToController: true
    };

    return directive;
  }

  /*@ngInject*/
  function TextareaItemCtrl(Utils, $element) {
    this.Element = $element;

    Utils.extend(this.item, {
      config: {}
    });
  }

})(angular);

(function (angular) {
  'use strict';

  angular.module('demoDocFormBuilder')
    .directive('radioButtonView', RadioButtonView);

  /*@ngInject*/
  function RadioButtonView($timeout) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/radio-button-item/radio-button-view.html',
      scope: {
        formItem: '=',
        isPreview: '&',
        form: '='
      },
      controller: RadioButtonViewCtrl,
      controllerAs: 'RadioButtonView',
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
  function RadioButtonViewCtrl(Utils) {
    this.Utils = Utils;
  }

  RadioButtonViewCtrl.prototype.init = function () {

    this.Utils.extend(this.formItem, {
      config: {},
      options: []
    });
  };


})(angular);

(function (angular) {
  'use strict';

  angular.module('demoDocFormBuilder')
    .directive('radioButtonItem', RadioButton);

  function RadioButton() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/radio-button-item/radio-button-item.html',
      scope: {
        item: '='
      },
      controller: RadioButtonCtrl,
      controllerAs: 'RadioButton',
      bindToController: true
    };

    return directive;
  }

  /*@ngInject*/
  function RadioButtonCtrl(Utils, $element) {
    this.Element = $element;
    Utils.extend(this.item, {
      config: {},
      options: [{
        value: ''
      }]
    });
  }

  RadioButtonCtrl.prototype.deleteOption = function (index) {
    this.item.options.splice(index, 1);
  };

  RadioButtonCtrl.prototype.addOption = function () {
    this.item.options.push({
      value: ''
    });

    setTimeout(function() {
      var options = this.Element.find('input');
      var addedOption = options[options.length - 1];
      addedOption.focus();
    }.bind(this), 0);
  };

})(angular);

(function (angular) {
  'use strict';

  angular.module('demoDocFormBuilder')
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

(function (angular) {
    'use strict';

    angular.module('demoDocFormBuilder')
      .directive('matrixView', MatrixView);

    /*@ngInject*/
    function MatrixView($timeout) {
      var directive = {
        restrict: 'E',
        templateUrl: 'app/directives/matrix-item/matrix-view.html',
        scope: {
          formItem: '=',
          isPreview: '&',
          form: '='
        },
        controller: MatrixViewCtrl,
        controllerAs: 'MatrixView',
        bindToController: true,
        link: linker
      };

      function linker(scope, elem, attrs, ctrl) {

        //this timeout is placed here in order to make sure that the creator directive of this view is finished its work
        $timeout(function () {
          ctrl.init();
        }, 50);
      }

      return directive;
    }

    /*@ngInject*/
    function MatrixViewCtrl($scope, Utils) {
      this.Scope = $scope;
      this.Utils = Utils;
      this.isValid = true;
    }

    MatrixViewCtrl.prototype.init = function () {
      this.Utils.extend(this.formItem, {
        config: {
          rows: [],
          columns: []
        }
      });

      this._updateValidity();
      if (this.isPreview()) {
        this._enableWatchers();
      }
    };

    MatrixViewCtrl.prototype._updateValidity = function () {
      var valid = true;
      if (this.formItem.config.required) {
        for (var i = 0; i < this.formItem.config.rows.length; i++) {
          if (!this.formItem.config.rows[i].hasOwnProperty('selected')) {
            valid = false;
            break;
          }
        }
      }

      this.isValid = valid;
      this.form.$setValidity('required', this.isValid);
    };

    MatrixViewCtrl.prototype._enableWatchers = function () {
      this.Scope.$watchGroup(['MatrixView.formItem.config.required',
                         'MatrixView.formItem.config.rows.length'], function (newVal) {
        if (newVal !== undefined) {
          this._updateValidity();
        }
      }.bind(this));
    };

  })
(angular);

(function (angular) {
  'use strict';

  angular.module('demoDocFormBuilder')
    .directive('matrixItem', matrixItem);

  function matrixItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/matrix-item/matrix-item.html',
      scope: {
        item: '='
      },
      controller: MatrixItemCtrl,
      controllerAs: 'Matrix',
      bindToController: true
    };

    return directive;
  }

  /*@ngInject*/
  function MatrixItemCtrl(Utils, $document) {
    this.RowContainer = angular.element($document[0].querySelector('.rowContainer'));
    this.ColumnContainer = angular.element($document[0].querySelector('.columnContainer'));

    Utils.extend(this.item, {
      config: {
        rows: [{
          value: ''
        }],
        columns: [{
          value: ''
        }]
      }
    });
  }

  MatrixItemCtrl.prototype.deleteRow = function(index) {
    this.item.config.rows.splice(index, 1);
  };

  MatrixItemCtrl.prototype.addRow = function() {
    this.item.config.rows.push({
      value: ''
    });

    setTimeout(function() {
      var options = this.RowContainer.find('input');
      var addedOption = options[options.length - 1];
      addedOption.focus();
    }.bind(this), 0);
  };

  MatrixItemCtrl.prototype.deleteColumn = function(index) {
    this.item.config.columns.splice(index, 1);
  };

  MatrixItemCtrl.prototype.addColumn = function() {
    this.item.config.columns.push({
      value: ''
    });

    setTimeout(function() {
      var options = this.ColumnContainer.find('input');
      var addedOption = options[options.length - 1];
      addedOption.focus();
    }.bind(this), 0);
  };

})(angular);

(function (angular) {
  'use strict';

  angular.module('demoDocFormBuilder')
    .directive('inputView', InputView);

  /*@ngInject*/
  function InputView($timeout) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/input-item/input-view.html',
      scope: {
        formItem: '=',
        form: '='
      },
      controller: InputViewCtrl,
      controllerAs: 'InputView',
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
  function InputViewCtrl(Utils) {
    this.Utils = Utils;
  }

  InputViewCtrl.prototype.init = function () {

    this.Utils.extend(this.formItem, {
      config: {}
    });
  };


})(angular);

(function (angular) {
  'use strict';

  angular.module('demoDocFormBuilder')
    .directive('inputItem', InputItem);

  function InputItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/input-item/input-item.html',
      scope: {
        item: '='
      },
      controller: InputItem,
      controllerAs: 'Input',
      bindToController: true
    };

    return directive;
  }

  /*@ngInject*/
  function InputItemCtrl(Utils, $element) {
    this.Element = $element;

    Utils.extend(this.item, {
      config: {
        type: 'text'
      }
    });
  }

})(angular);

(function (angular) {
  'use strict';

  angular.module('demoDocFormBuilder')
    .directive('formView', FormView);

  function FormView() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/form-view/form-view.html',
      scope: {
        form: '='
      },
      controller: FormViewCtrl,
      controllerAs: 'FormView',
      bindToController: true,
      link: linker
    };

    function linker(scope, elem, attrs, ctrl) {
      ctrl.init();
    }

    return directive;
  }

  /*@ngInject*/
  function FormViewCtrl($scope) {
    this.Scope = $scope;
  }

  FormViewCtrl.prototype.init = function () {
  };

})(angular);

(function (angular) {
  'use strict';

  angular.module('demoDocFormBuilder')
    .directive('formItemsContainer', FormItemsContainer);

  /** @ngInject */
  function FormItemsContainer() {
    var directive = {
      restrict: 'E',
      scope: {
        form: '='
      },
      controller: FormItemsContainerCtrl,
      controllerAs: 'container',
      bindToController: true,
      templateUrl: 'app/directives/form-items-container/form-items-container.html'
    };

    return directive;
  }

  var vm;

  /*@ngInject*/
  function FormItemsContainerCtrl() {
    vm = this;
  }

  FormItemsContainerCtrl.prototype.delete = function(item, index) {
    vm.form.items.splice(index, 1);
  };

  FormItemsContainerCtrl.prototype.up = function(item, index) {
    if(index !== 0) {
      var prevItem = vm.form.items[index - 1];
      vm.form.items[index] = prevItem;
      vm.form.items[index - 1] = item;
    }
  };

  FormItemsContainerCtrl.prototype.down = function(item, index) {
    if(index !== vm.form.items.length - 1) {
      var nextItem = vm.form.items[index + 1];
      vm.form.items[index] = nextItem;
      vm.form.items[index + 1] = item;
    }
  };

})(angular);

(function (angular) {
  'use strict';

  angular.module('demoDocFormBuilder')
    .directive('formItem', FormItem);

  /** @ngInject */
  function FormItem($compile) {
    var directive = {
      restrict: 'E',
      link: linker,
      scope: {
        item: '=',
        onDelete: '&',
        onUp: '&',
        onDown: '&',
        index: '&'
      },
      controller: FormItemCtrl,
      controllerAs: 'FormItem',
      bindToController: true
    };

    function linker(scope, elem, attrs, ctrl) {
      var template = ctrl._getItemTemplate(attrs.type);
      var el = $compile(template)(scope);
      elem.append(el);

      ctrl.init();
    }

    return directive;
  }

  /*@ngInject*/
  function FormItemCtrl($attrs, Utils) {
    this.Attrs = $attrs;
    this.Utils = Utils;
    this.templates = {
      input: '<input-item item="FormItem.item"></input-item>',
      chooseFromList: '<bet-form-choose-from-list item="FormItem.item"></bet-form-choose-from-list>',
      multipleChoices: '<radio-button-item item="FormItem.item"></radio-button-item>',
      matrix: '<matrix-item item="FormItem.item"></matrix-item>',
      checkboxes: '<checkboxes-item item="FormItem.item"></checkboxes-item>',
      textarea: '<textarea-item item="FormItem.item"></textarea-item>',
      photo: '<photo-item item="FormItem.item"></photo-item>'
    };
  }

  FormItemCtrl.prototype.init = function () {
    this.Utils.extend(this.item, {
      type: this.Attrs.type,
      props: {
        title: '',
        helpText: ''
      },
      config: {
        required: false
      }
    });
  };

  FormItemCtrl.prototype.deleteClicked = function() {
    this.onDelete({item: this.item, index: this.index()});
  };

  FormItemCtrl.prototype._getItemTemplate = function (type) {
    var prefix = '' +
      '<div class="form-item-container">' +
        '<div class="form-item-actions">' +
          '<md-button class="md-button" ng-if="FormItem.Attrs.onDelete" ng-click="FormItem.deleteClicked()"> ' +
            '<i class="material-icons small">delete</i>' +
          '</md-button>' +
          '<md-button class="md-button" ng-if="FormItem.Attrs.onUp" ng-click="FormItem.onUp({item: FormItem.item, index: FormItem.index()})"> ' +
            '<i class="material-icons small">arrow_drop_up</i>' +
          '</md-button>' +
          '<md-button class="md-button" ng-if="FormItem.Attrs.onDown" ng-click="FormItem.onDown({item: FormItem.item, index: FormItem.index()})"> ' +
            '<i class="material-icons small">arrow_drop_down</i>' +
          '</md-button>' +
        '</div>' +
        '<md-input-container>' +
          '<label>Field Title</label>' +
          '<input ng-model="FormItem.item.props.title"/>' +
        '</md-input-container>' +
        '<md-input-container>' +
          '<label>Help Text</label>' +
          '<input ng-model="FormItem.item.props.helpText" />' +
        '</md-input-container>';

    var suffix = '' +
      '<md-input-container>' +
        '<md-checkbox ng-model="FormItem.item.config.required">Required field</md-checkbox>' +
      '</md-input-container>' +
    '</div>';

    return prefix + this.templates[type] + suffix;
  };

})(angular);

(function (angular) {
  'use strict';

  angular.module('demoDocFormBuilder')
    .directive('checkboxesView', CheckboxesView);

  /*@ngInject*/
  function CheckboxesView($timeout) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/checkboxes-item/checkboxes-view.html',
      scope: {
        formItem: '=',
        isPreview: '&',
        form: '='
      },
      controller: CheckboxesViewCtrl,
      controllerAs: 'CheckboxesView',
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
  function CheckboxesViewCtrl($scope, Utils) {
    this.Scope = $scope;
    this.Utils = Utils;
  }

  CheckboxesViewCtrl.prototype.init = function () {
    this.Utils.extend(this.formItem, {
      config: {},
      options: []
    });

    this.selectedOptions = this._getSelectedOptions();
    this.disableOptions = false;

    this.isValid = true;
    this._updateView();
    this._updateValidity();
    if (this.isPreview()) {
      this._enableWatchers();
    }
  };

  CheckboxesViewCtrl.prototype.toggleSelectedOption = function () {
    this.selectedOptions = this._getSelectedOptions();
    this._updateView();
    this._updateValidity();
  };

  CheckboxesViewCtrl.prototype._getSelectedOptions = function () {
    return this.formItem.options.filter(function (option) {
      return option.selected;
    });
  };

  CheckboxesViewCtrl.prototype._updateView = function () {
    if (!this.formItem.config.maxSelections) {
      this.disableOptions = false;
    } else if (this.selectedOptions.length === this.formItem.config.maxSelections) {
      this.disableOptions = true;
    } else {
      this.disableOptions = false;
    }
  };

  CheckboxesViewCtrl.prototype._updateValidity = function () {
    if (this.formItem.config.required) {
      this.isValid = this.selectedOptions.length > 0;
    } else {
      this.isValid = true;
    }

    this.form.$setValidity('minSelections', this.isValid);
  };

  CheckboxesViewCtrl.prototype._enableWatchers = function () {
    this.Scope.$watch('CheckboxesView.formItem.config.required', function (newVal) {
      if (newVal !== undefined) {
        this._updateView();
        this._updateValidity();
      }
    }.bind(this));
  };

})(angular);

(function (angular) {
  'use strict';

  angular.module('demoDocFormBuilder')
    .directive('checkboxesItem', CheckboxesItem);

  function CheckboxesItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/checkboxes-item/checkboxes-item.html',
      scope: {
        item: '='
      },
      controller: CheckboxesItemCtrl,
      controllerAs: 'Checkboxes',
      bindToController: true
    };

    return directive;
  }

  /*@ngInject*/
  function CheckboxesItemCtrl(Utils, $element) {
    this.Element = $element;

    Utils.extend(this.item, {
      config: {
        maxSelections: null
      },
      options: [{
        value: '',
        selected: false
      }]
    });
  }

  CheckboxesItemCtrl.prototype.deleteOption = function (index) {
    this.item.options.splice(index, 1);
  };

  CheckboxesItemCtrl.prototype.addOption = function () {
    this.item.options.push({
      value: '',
      selected: false
    });

    setTimeout(function() {
      var options = this.Element.find('input');
      var addedOption = options[options.length - 1];
      addedOption.focus();
    }.bind(this), 0);
  };

})(angular);

(function (angular) {
  'use strict';

  angular.module('demoDocFormBuilder')
    .service('Utils', Utils);

  function Utils() {}

  Utils.prototype.extend = function(dest, src) {
    Object.keys(src).forEach(function(key) {
      if(!dest.hasOwnProperty(key)) {
        dest[key] = src[key];
      } else if(typeof src[key] === 'object') {
        this.extend(dest[key], src[key]);
      }
    }.bind(this));

    return dest;
  };

})(angular);


(function(angular) {
'use strict';
angular.module('demoDocFormBuilder')
.factory('fileUploadService', function ($q, $http) {
    var services = {
        uploadFileToUrl: uploadFileToUrl,
        deleteBlob: deleteBlob,
        getUploadUrl: getUploadUrl
    }

    var path_to_photo_api = '/rest/photo';
    var path_to_get_upload_url = './rest/blobstore/url';

    function success(data) {

        return $q.resolve(data.data);
    }

    function error(error) {
        console.log(error);
        console.log("There was an error");


        return $q.reject(error);
    }

    function uploadFileToUrl(file, uploadUrl)
    {
        var fd = new FormData();
        fd.append('file', file);
        return $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(success, error);
    }

    function deleteBlob(blob_key)
    {
        return $http.delete(path_to_photo_api + '/' + blob_key)
        .then(success, error);
    }

    function getUploadUrl()
    {
        return $http.get(path_to_get_upload_url).then(success, error);
    }

    return services;
});

})(angular);

(function (angular) {
  'use strict';

  angular
    .module('demoDocFormBuilder')
    .controller('MainController', MainController);

  var vm;
  /** @ngInject */
  function MainController() {
    vm = this;
    vm.form = {
      items: []
    };
  }

  MainController.prototype.addItem = function (type) {
    this.form.items.push({
      type: type
    });
  };

  MainController.prototype.delete = function(item, index) {
    vm.form.items.splice(index, 1);
  };

  MainController.prototype.up = function(item, index) {
    if(index !== 0) {
      var prevItem = vm.form.items[index - 1];
      vm.form.items[index] = prevItem;
      vm.form.items[index - 1] = item;
    }
  };

  MainController.prototype.down = function(item, index) {
    if(index !== vm.form.items.length - 1) {
      var nextItem = vm.form.items[index + 1];
      vm.form.items[index] = nextItem;
      vm.form.items[index + 1] = item;
    }
  };

})(angular);

angular.module('demoDocFormBuilder').run(['$templateCache', function($templateCache) {$templateCache.put('app/directives/checkboxes-item/checkboxes-item.html','<div class="sortable-container" layout="column" sv-root="" sv-part="Checkboxes.item.options"><md-input-container><label>Max Selections</label> <input type="number" ng-model="Checkboxes.item.config.maxSelections"></md-input-container><md-switch ng-model="Checkboxes.item.config.direction" ng-true-value="\'horizontal\'" ng-false-value="\'vertical\'">Layout direction ({{Checkboxes.item.config.direction == \'horizontal\' ? \'Horizontal\' : \'Vertical\'}})</md-switch><div class="option-item" layout="row" ng-repeat="option in Checkboxes.item.options track by $index" sv-element=""><md-button class="md-button handle" md-no-ink="" aria-label="reorder option item" sv-handle=""><i class="material-icons">reorder</i></md-button><md-input-container><label>Option {{$index + 1}}</label> <input ng-model="option.value"></md-input-container><md-button class="md-button" ng-click="Checkboxes.deleteOption($index)"><i class="material-icons">delete</i></md-button></div><div layout="row" layout-align="start"><md-button class="md-primary add-option-button" ng-click="Checkboxes.addOption()">Add Option</md-button></div></div>');
$templateCache.put('app/directives/checkboxes-item/checkboxes-view.html','<md-input-container><div layout="{{CheckboxesView.formItem.config.direction == \'horizontal\' ? \'column\' : \'row\'}}"><md-checkbox ng-repeat="option in CheckboxesView.formItem.options track by $index" ng-model="option.selected" ng-change="CheckboxesView.toggleSelectedOption(option)" ng-disabled="CheckboxesView.disableOptions && !option.selected" aria-label="...">{{option.value}}</md-checkbox></div><div ng-messages="CheckboxesView.form.$error"><div ng-message="minSelections">Must select {{CheckboxesView.formItem.maxSelections || 1}} items</div></div></md-input-container>');
$templateCache.put('app/directives/form-items-container/form-items-container.html','<div><form-item ng-repeat="item in container.form.items track by $index" type="{{item.type}}" item="item" index="$index" on-delete="container.delete(item, index)" on-up="container.up(item, index)" on-down="container.down(item, index)"></form-item></div>');
$templateCache.put('app/directives/form-view/form-view.html','<div class="formItem" ng-repeat="formItem in FormView.form.items track by $index" ng-switch="formItem.type" layout="column"><ng-form name="formItemForm"><div><div class="formItem-title">{{formItem.props.title}}</div><div class="formItem-help-text">{{formItem.props.helpText}}</div><checkboxes-view form-item="formItem" is-preview="true" form="formItemForm" ng-switch-when="checkboxes"></checkboxes-view><radio-button-view form-item="formItem" is-preview="true" form="formItemForm" ng-switch-when="multipleChoices"></radio-button-view><input-view form-item="formItem" form="formItemForm" ng-switch-when="input"></input-view><textarea-view form-item="formItem" form="formItemForm" ng-switch-when="textarea"></textarea-view><matrix-view form-item="formItem" is-preview="true" form="formItemForm" ng-switch-when="matrix"></matrix-view><photo-view form-item="formItem" is-privew="true" form="formItemForm" ng-switch-when="photo"></photo-view></div></ng-form></div>');
$templateCache.put('app/directives/input-item/input-item.html','<md-input-container class="input-container"><label>Placeholder</label> <input type="text" ng-model="Input.item.config.placeholder"></md-input-container><md-input-container><label>Type</label><md-select ng-model="Input.item.config.type"><md-option value="text">Text</md-option><md-option value="number">Number</md-option></md-select></md-input-container>');
$templateCache.put('app/directives/input-item/input-view.html','<md-input-container><input ng-model="InputView.formItem.value" type="{{InputView.formItem.config.type}}" placeholder="{{InputView.formItem.config.placeholder}}" ng-required="InputView.formItem.config.required"><div ng-messages="InputView.form.$error"><div ng-message="required">This field is required</div></div></md-input-container>');
$templateCache.put('app/directives/matrix-item/matrix-item.html','<div class="sortable-container columnContainer" layout="column" sv-root="" sv-part="Matrix.item.config.columns"><div class="option-item" layout="row" ng-repeat="column in Matrix.item.config.columns track by $index" sv-element=""><md-button class="md-button handle" md-no-ink="" aria-label="reorder option item" sv-handle=""><i class="material-icons">reorder</i></md-button><md-input-container class="input-container"><label>Column {{$index + 1}}</label> <input ng-model="column.value"></md-input-container><md-button class="md-button" md-no-ink="" aria-label="delete column item" ng-click="Matrix.deleteColumn($index)"><i class="material-icons">delete</i><md-tooltip md-autohide="true">Delete</md-tooltip></md-button></div><div layout="row" layout-align="start"><md-button class="md-primary add-option-button" md-no-ink="" aria-label="add option item" ng-click="Matrix.addColumn()">Add Column</md-button></div></div><div class="sortable-container rowContainer" layout="column" sv-root="" sv-part="Matrix.item.config.rows"><div class="option-item" layout="row" ng-repeat="row in Matrix.item.config.rows track by $index" sv-element=""><md-button class="md-button handle" md-no-ink="" aria-label="reorder row item" sv-handle=""><i class="material-icons">reorder</i></md-button><md-input-container class="input-container"><label>Row {{$index + 1}}</label> <input ng-model="row.value"></md-input-container><md-button class="md-button" md-no-ink="" aria-label="delete row item" ng-click="Matrix.deleteRow($index)"><i class="material-icons">delete</i><md-tooltip md-autohide="true">Delete</md-tooltip></md-button></div><div layout="row" layout-align="start"><md-button class="md-primary add-option-button" md-no-ink="" aria-label="add row item" ng-click="Matrix.addRow()">Add row</md-button></div></div>');
$templateCache.put('app/directives/matrix-item/matrix-view.html','<md-input-container class="matrix-container" layout="column"><div class="matrix"><div class="matrix-row" flex="" layout="row"><span class="matrix-cell" flex="20"></span> <span class="matrix-cell matrix-cell-header" flex="" ng-repeat="column in MatrixView.formItem.config.columns track by $index">{{column.value}}</span></div><div class="matrix-row" ng-repeat="row in MatrixView.formItem.config.rows track by $index" layout="row"><span class="matrix-cell" flex="20" layout="column" layout-align="center">{{row.value}}</span><md-radio-group ng-model="row.selected" ng-change="MatrixView._updateValidity()" flex="" layout="row"><span class="matrix-cell radio-button-cell" flex="" ng-repeat="column in MatrixView.formItem.config.columns track by $index"><md-radio-button value="{{column.value}}" aria-label="..."></md-radio-button></span></md-radio-group></div></div><div ng-messages="MatrixView.form.$error"><div ng-message="required">This is required</div></div></md-input-container>');
$templateCache.put('app/directives/photo-item/photo-item.html','');
$templateCache.put('app/directives/photo-item/photo-view.html','<md-input-container><input ng-hide="vm.file_uploaded" type="file" file-model="vm.myFile"> {{vm.formItem.value}} <input ng-hide="true" ng-model="vm.formItem.value" type="text" ng-required="vm.formItem.config.required"><div ng-messages="vm.form.$error"><div ng-message="required">This field is required</div></div><md-button ng-hide="vm.file_uploaded" ng-click="vm.uploadFile()">upload me</md-button><md-button ng-show="vm.file_uploaded" ng-click="vm.removeBlob()">remove</md-button></md-input-container>');
$templateCache.put('app/directives/radio-button-item/radio-button-item.html','<div class="sortable-container" layout="column" sv-root="" sv-part="RadioButton.item.options"><md-switch ng-model="RadioButton.item.config.direction" ng-true-value="\'horizontal\'" ng-false-value="\'vertical\'">Layout direction ({{RadioButton.item.config.direction == \'horizontal\' ? \'Horizontal\' : \'Vertical\'}})</md-switch><div class="option-item" layout="row" ng-repeat="option in RadioButton.item.options track by $index" sv-element=""><md-button class="md-button handle" md-no-ink="" aria-label="reorder option item" sv-handle=""><i class="material-icons">reorder</i></md-button><md-input-container><label>Option {{$index + 1}}</label> <input ng-model="option.value"></md-input-container><md-button class="md-button" ng-click="RadioButton.deleteOption($index)"><i class="material-icons">delete</i></md-button></div><div layout="row" layout-align="start"><md-button class="md-primary add-option-button" ng-click="RadioButton.addOption()">Add Option</md-button></div></div>');
$templateCache.put('app/directives/radio-button-item/radio-button-view.html','<md-input-container><md-radio-group name="formItemInput" ng-required="RadioButtonView.formItem.config.required" ng-model="RadioButtonView.formItem.value" layout="{{RadioButtonView.formItem.config.direction == \'horizontal\' ? \'column\' : \'row\'}}" required=""><md-radio-button ng-repeat="option in RadioButtonView.formItem.options track by $index" value="{{option.value}}" aria-label="...">{{option.value}}</md-radio-button></md-radio-group><div ng-messages="RadioButtonView.form.$error"><div ng-message="required">This field is required</div></div></md-input-container>');
$templateCache.put('app/directives/textarea-item/textarea-item.html','<md-input-container class="input-container"><label>Placeholder</label> <input type="text" ng-model="Textarea.item.config.placeholder"></md-input-container>');
$templateCache.put('app/directives/textarea-item/textarea-view.html','<md-input-container><textarea ng-model="TextareaView.formItem.value" placeholder="{{TextareaView.formItem.config.placeholder}}" ng-required="TextareaView.formItem.config.required"></textarea><div ng-messages="TextareaView.form.$error"><div ng-message="required">This field is required</div></div></md-input-container>');}]);