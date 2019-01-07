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
    'touchr': 'libs/touchr/touchr'
  }
    //endinjector
});

require(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojlistview', 'ojs/ojcollectiontabledatasource', 'ojs/ojinputtext', 'ojs/ojinputnumber', 'ojs/ojdatetimepicker', 'ojs/ojselectcombobox'],
function(oj, ko, $)
{
    function viewModel()
    {
      var self = this;

      self.dateConverter = oj.Validation.converterFactory("datetime").createConverter({ formatStyle: 'date', dateFormat: 'medium' });
      self.salaryConverter = oj.Validation.converterFactory('number').createConverter({ style: 'currency', currency: 'USD' });        
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

      self.collection = new oj.Collection(null, {
        model: new oj.Model.extend({idAttribute: 'EMPLOYEE_ID'}),
        url: 'js/employeeData.json'
      });        
      self.dataSource = ko.observable(new oj.CollectionTableDataSource(self.collection));

      var sortCriteria = {
        'default': { 'key': 'EMPLOYEE_ID', 'direction': 'ascending' },
        'hdAsc': { 'key': 'HIRE_DATE', 'direction': 'ascending' },
        'hdDesc': { 'key': 'HIRE_DATE', 'direction': 'descending' },
        'salAsc': { 'key': 'SALARY', 'direction': 'ascending' },
        'salDesc': { 'key': 'SALARY', 'direction': 'descending' }
      };
      this.currentSort = ko.observable('default');
      self.sortList = function () {
        self.dataSource().sort(sortCriteria[self.currentSort()]);
      };

      this.currentFilter = ko.observable('');
      var originalCollection = self.collection;
      function filterFunc (model) {
        return model.get('DEPARTMENT_ID') === parseInt(self.currentFilter());
      }
      this.filterList = function(event, ui) {      
        if (self.currentFilter() === 'all') {
          self.collection = originalCollection;
        } else {
          self.collection = new oj.Collection(originalCollection.filter(filterFunc));
        }
        self.dataSource(new oj.CollectionTableDataSource(self.collection));

        if (self.currentSort() !== 'default') {
          self.dataSource().sort(sortCriteria[self.currentSort()]);
        }
      };

      // var nextKey = 121;        

      // //build a new model from the observables in the form
      // self.buildModel = function() {
      //   return {
      //     'EMPLOYEE_ID': self.inputEmployeeID(),
      //     'FIRST_NAME': self.inputFirstName(),
      //     'LAST_NAME': self.inputLastName(),
      //     'HIRE_DATE': self.inputHireDate(),
      //     'SALARY': self.inputSalary()
      //   };
      // };
        
      // //used to update the fields based on the selected row
      // self.updateFields = function(model) {      
      //   self.inputEmployeeID(model.get('EMPLOYEE_ID'));
      //   self.inputFirstName(model.get('FIRST_NAME'));
      //   self.inputLastName(model.get('LAST_NAME'));
      //   self.inputHireDate(model.get('HIRE_DATE'));
      //   self.inputSalary(model.get('SALARY'));
      // };

      // //add the model to the collection at index 0
      // self.add = function() {
      //   if (self.inputEmployeeID(nextKey) < nextKey) {
      //     self.inputEmployeeID(nextKey);            
      //   }
      //   var model = self.buildModel();
      //   nextKey += 1;
      //   self.inputEmployeeID(nextKey);
      //   self.collection.add(model, {at:0});
      // };

      // // update the model in the collection
      // self.update = function() {
      //   if (self.modelToUpdate) {
      //     self.modelToUpdate.set(self.buildModel());
      //   }
      // };

      // //remove the selected model from the collection
      // self.remove = function() {
      //   self.collection.remove(self.modelToUpdate);
      // };

      // //reset the fields to their original values
      // self.resetFields = function() {       
      //   self.inputEmployeeID(nextKey);
      //   self.inputFirstName('Jane');
      //   self.inputLastName('Doe');
      //   self.inputHireDate(oj.IntlConverterUtils.dateToLocalIso(new Date()));
      //   self.inputSalary(15000);
      // };  

      // //intialize the observable values in the forms
      // self.inputEmployeeID = ko.observable(nextKey);
      // self.inputFirstName = ko.observable('Jane');
      // self.inputLastName = ko.observable('Doe');
      // self.inputHireDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
      // self.inputSalary = ko.observable(15000);

      // self.getCellClassName = function(cellContext) {
      //   var key = cellContext['keys']['column'];
      //   if (key === 'SALARY') { 
      //     return 'oj-helper-justify-content-right';
      //   }
      //   return 'oj-helper-justify-content-flex-start';                          
      // }

      // document.getElementById('datagrid').addEventListener('selectionChanged', function(event) {
      //   //on selection change update fields with the selected model
      //   var selection = event.detail['value'][0];
      //   if (selection != null) {
      //     var rowKey = selection['startKey']['row'];
      //     self.modelToUpdate = self.collection.get(rowKey);
      //     self.updateFields(self.modelToUpdate);
      //   }
      // });        
    };

    $(function() {
      var vm = new viewModel();
      ko.applyBindings(vm, document.getElementById('datagrid-wrapper'));
    });
});
