'use strict';

var chai = require('chai');
var should = chai.should();
// global.ko = require('../../Website/Scripts/knockout-3.4.0.js');
var requirejs = require('requirejs');
// requirejs.config({
//   baseUrl: './js/viewModels/spa-router',
//   // nodeRequire: require
// });

describe('Webpack ViewModel', function () {

  before(function(done) {
    var webpackVM;
    requirejs(['../../../src/js/viewModels/spa-router/webpack'], function (ViewModel) {
      webpackVM = new ViewModel();
      done();
    });
  });

  describe('add()', function() {

    context('when a + b', function() {
      it('should not throw an error', function() {
        webpackVM.add(1,1).should.equal(2);
      });

      // it('should return -1', function() {
      //   [1,2,3].indexOf(4).should.equal(-1);
      // });
    });

    // context('when present', function() {
    //   it('should return the index where the element first appears in the array', function() {
    //     [1,2,3].indexOf(3).should.equal(2);
    //   });
    // });

  });

});