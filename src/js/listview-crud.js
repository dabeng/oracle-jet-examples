'use strict';

requirejs.config({
  baseUrl: 'js',

  // Path mappings for the logical module names
  // Update the main-release-paths.json for release mode when updating the mappings
  paths:
  //injector:mainReleasePaths
  {
    'knockout': 'libs/knockout/knockout-3.4.2.debug',
    'jquery': 'libs/jquery/jquery-3.3.1',
    'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.1',
    'promise': 'libs/es6-promise/es6-promise',
    'hammerjs': 'libs/hammer/hammer-2.0.8',
    'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0',
    'ojs': 'libs/oj/v6.0.0/debug',
    'ojL10n': 'libs/oj/v6.0.0/ojL10n',
    'ojtranslations': 'libs/oj/v6.0.0/resources',
    'text': 'libs/require/text',
    'signals': 'libs/js-signals/signals',
    'customElements': 'libs/webcomponents/custom-elements.min',
    'proj4': 'libs/proj4js/dist/proj4-src',
    'css': 'libs/require-css/css',
    'touchr': 'libs/touchr/touchr',
  }
    //endinjector
});

require(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojarraydataprovider', 'ojs/ojknockout', 'ojs/ojlistview', 'ojs/ojmodel',
  'ojs/ojcollectiontabledatasource', 'ojs/ojinputtext', 'ojs/ojinputnumber', 'ojs/ojdatetimepicker', 'ojs/ojselectcombobox'],
function (oj, ko, $, ArrayDataProvider) {
  function ViewModel () {
    var self = this;

    self.dateConverter = oj.Validation.converterFactory('datetime').createConverter({ formatStyle: 'date', dateFormat: 'medium' });
    self.formatDate = function (dateStr) {
      return self.dateConverter.format(oj.IntlConverterUtils.dateToLocalIso(new Date(dateStr)));
    };
    self.salaryConverter = oj.Validation.converterFactory('number').createConverter({ style: 'currency', currency: 'USD' });
    self.formatSalary = function (numberStr) {
      return self.salaryConverter.format(numberStr);
    };   
    self.getDeptName = function (deptId) {
      var deptName = '';
      switch (deptId) {
        case 10:
          deptName = 'Administration';
          break;
        case 20:
          deptName = 'Marketing';
          break;
        case 30:
          deptName = 'Sales';
          break;
        case 40:
          deptName = 'Finance';
          break;
        case 50:
          deptName = 'Human Resources';
          break;
      }
      return deptName;
    };

    self.modelAjax = function (operation, model, options) {
      var request = { url: 'http://localhost:3000/employees' };
      if (operation === 'update' || operation === 'delete') {
        request.url = request.url + '/' + options.recordID;
      }
      return request;
    };

    self.collectionAjax = function (operation, collection, options) {
      var request = {
        url: 'http://localhost:3000/employees',
        data: {
          _start: self.collection.length,
          _limit: 5
        }
      };
      if (self.currentSort() !== 'default') {
        request.data._sort = self.sortCriteria[self.currentSort()].key;
        request.data._order = self.sortCriteria[self.currentSort()].direction;
      }
      if (self.currentFilter() !== 'all') {
        request.data.DEPARTMENT_ID = self.currentFilter();
      }
      if (self.currentNameSearch().trim()) {
        request.data.NAME_like = self.currentNameSearch().trim();
      }
      if (self.currentGlobalSearch().trim()) {
        request.data.q = self.currentGlobalSearch().trim();
      }
      return request;
    };

    self.collection = new oj.Collection(null, {
      model: oj.Model.extend({
        idAttribute: 'id',
        customURL: self.modelAjax
      }),
      fetchSize: 5,
      customURL: self.collectionAjax
    });   
    self.dataSource = ko.observable(new oj.CollectionTableDataSource(self.collection));

    self.collection.on('request', function() {
      console.log('request more data');
    });

    self.collection.on('sync', function() {
      console.log('sync');
    });

    self.collection.on('ready', function() {
      console.log('ready');
    });

    self.fillOutform = function (id) {
      self.collection.get(id).then(function (model) {
        self.modelToUpdate = model;
        self.inputId(model.get('id'));
        self.inputName(model.get('NAME'));
        self.inputHireDate(oj.IntlConverterUtils.dateToLocalIso(new Date(model.get('HIRE_DATE'))));
        self.inputSalary(model.get('SALARY'));
        self.inputDepartment(model.get('DEPARTMENT_ID'));
      });
    };

    // reset the fields to their original values
    self.resetFields = function () {
      self.inputId(self.uuidv4());
      self.inputName('');
      self.inputHireDate(oj.IntlConverterUtils.dateToLocalIso(new Date()));
      self.inputDepartment(30);
      self.inputSalary(0);
    }; 

    // update the fields based on the selected item
    self.handleSelectionChanged = function (event) {
      if (event.detail.value[0]) { // select one item
        self.fillOutform(event.detail.value[0]);
      } else { // current selected item is removed
        self.resetFields();
      }
    };

    self.uuidv4 = function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    };
    

    // intialize the observable values in the form
    self.inputId = ko.observable(self.uuidv4());
    self.inputName = ko.observable('');
    self.inputHireDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
    self.inputDepartment = ko.observable(30);
    self.deptOptions = new ArrayDataProvider([
      {value: 10, label: 'Administration'},
      {value: 20, label: 'Marketing'},
      {value: 30, label: 'Sales'},
      {value: 40, label: 'Finance'},
      {value: 50, label: 'Human Resources'}
    ], { keyAttributes: 'value' });
    self.inputSalary = ko.observable(0);

    // build a new model from the observables in the form
    self.buildModel = function () {
      return {
        'id': self.inputId(),
        'NAME': self.inputName(),
        'HIRE_DATE': self.inputHireDate(),
        'SALARY': self.inputSalary(),
        'DEPARTMENT_ID': self.inputDepartment()
      };
    };

    // add the model to the collection 
    self.add = function () {
      self.inputId(self.uuidv4());
      self.collection.create(self.buildModel(), {
        wait:true,
        // merge: true,
        silent: true,
        success: function (model, response, options) {
          self.collection.refresh();
          console.log('Create operation succeeds');
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log('Error in Create: ' + textStatus);
        }
      }).then(function() {
        // Jump to last page to show
        var a = 1;
      });
    };

    // update the model in the collection
    self.update = function () {
      if (self.modelToUpdate) {
        self.modelToUpdate.save(self.buildModel(), {
          success: function (model, response, options) {
            console.log('Update operation succeeds');
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log('Error in Update: ' + textStatus);
          }
        });
      }
    };

    // remove the selected model from the collection
    self.remove = function () {
      if (self.modelToUpdate) {
        self.modelToUpdate.destroy({
          wait: true,
          success: function (model, response, options) {
            console.log('Delete operation succeeds');
          },
          error: function (model, xhr, status, error) {
            console.log('Error in Delete: ' + textStatus);
          }
        });
      }
    };

    // sort the list according to the HIRE_DATE or SALARY
    self.sortCriteria = {
      'default': { 'key': 'id', 'direction': 'asc' },
      'hdAsc': { 'key': 'HIRE_DATE', 'direction': 'asc' },
      'hdDesc': { 'key': 'HIRE_DATE', 'direction': 'desc' },
      'salAsc': { 'key': 'SALARY', 'direction': 'asc' },
      'salDesc': { 'key': 'SALARY', 'direction': 'desc' }
    };
    self.currentSort = ko.observable('default');
    self.sortList = function () {
      self.collection.comparator = '';
      self.collection.sort();
    };

    self.currentFilter = ko.observable('all');
    self.filterList = function (event, ui) {
      self.collection.refresh();
    };

    self.currentNameSearch = ko.observable('');
    self.searchList = function(event, ui) {
      self.collection.refresh();
    };

    self.currentGlobalSearch = ko.observable('');
    self.globalSearchList = function(event, ui) {
      self.collection.refresh();
    };

  };

  $(function() {
    var vm = new ViewModel();
    ko.applyBindings(vm, document.getElementById('datagrid-wrapper'));
  });
});
