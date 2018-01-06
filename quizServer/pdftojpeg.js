/**
 * pdftojpeg.js
 * function prefix:
 * author: Bu Sun Kim
 *
 * This is a module that converts pdf files to multiple jpgs (one for each pdf page).
 * These jegs are stored in a directory named the original pdf file name (without the extension).
 *
 * Usage:
 * Reqire the module "pdftojpeg" and call the function "pdftojpeg"
 *
 * Output:
 * A directory in uploads will be created with the same name as the original pdf and one or more jpegs containing converted pages.
 * For a three page pdf  "test.pdf" the three files 'test-1.jpg' 'test-2.jpg' 'test-3.jpg' will be generated and placed in uploads/test/
 * The callback returns a array of absolute paths to the images.
 */


/**
 * This function calls pdftoimage and converts a single pdf into a directory of JPG
 * images.
 *
 * @param filepath - Path to the pdf file.
 */
var fs = require('fs');
var path = require('path');
var pdftoimage = require('pdftoimage');
var mkdirp = require('mkdirp');

function pdftojpeg(filepath, use_time_stamp, callback){
    require('process').chdir(__dirname);
    var timestamp = "";
    if (use_time_stamp){
        timestamp = Date.now();
    }
    var output_dir = path.join(__dirname + '/../uploads', path.parse(path.basename(filepath)).name + timestamp);
     mkdirp(output_dir, function (err) {
        if (err) console.error(err)
        else {
          pdftoimage(filepath, {
          format: 'jpeg',
          outdir: output_dir
        })
       .then(function(){
           console.log("conversion done");
           fs.readdir(output_dir, function(err, files){
               for (var i=0; i<files.length; i++){
                   files[i] = path.join(output_dir, files[i]);
               }
               console.log("converted pdf to jpegs: "+ files);
               callback(files);
           });
        })
        .catch(function(err){
            console.error(err);
            callback(err);
        });  
         }
    });

    
}

module.exports.pdftojpeg = pdftojpeg;


