/**
 * Created by busun on 2/02/17.
 * Tests for pdftojpeg.js 
 */
var process = require('process');
var path = require('path');
var pdftojpeg = require('../pdftojpeg.js');
var fs = require('fs-extra');
var assert = require('assert');

describe('pdftojpeg', function() {
  describe('#get_pdftojpeg_single', function() {
    var uploads = path.join(__dirname,  '/../../uploads/test001');
    var upload_paths = [];
    
    before(function(done){
      fs.removeSync(uploads);
      pdftojpeg.pdftojpeg(path.join(__dirname ,'test001.pdf'), false,
        function(results){
          upload_paths = results;
          done();
        });
    });

    it('it should get one jpeg for a one page pdf.', function() {
      var items = fs.readdirSync(uploads);
      assert.equal(items.length, 1);
      assert.notEqual(items.length, 2);
      assert.equal(upload_paths.length, items.length);
      assert.equal(path.basename(upload_paths[0]), items[0]);
    });

    after(function(){
      fs.removeSync(uploads);
    });

  });



  describe('#get_pdftojpeg_double', function() {
    var uploads = path.join(__dirname, '/../../uploads/test002');
    var upload_paths = [];

    before(function(done){
      fs.removeSync(uploads);
      pdftojpeg.pdftojpeg(path.join(__dirname , 'test002.pdf'), false,
        function(results){
         upload_paths = results;
         done();
       });
    })

    it('it should get one jpeg for a one page pdf.', function() {
      var items = fs.readdirSync(uploads);
      assert.equal(items.length, 2);
      assert.notEqual(items.length, 1);
      assert.equal(upload_paths.length, items.length);
      assert.equal(path.basename(upload_paths[0]), items[0]);
      assert.equal(path.basename(upload_paths[1]), items[1]);
    });

    after(function(){
      fs.removeSync(uploads);
    })

  });

});
