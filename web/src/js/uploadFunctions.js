/* uploadFunctions.js */
/* Authors: Dylan Nguyen, and pasted into this file by Ryan Tabler. */
/* This script is called from headBar.html using jQuery's $.getScript().
 * It uses jQuery to define functions necessary for the "Upload a Document" button to work. */

$('.upload-btn').on('click', function () {
    $('#upload-input').click();
});

$('#upload-input').on('change', function() {

//Check for .txt extension
var fileSelect = document.getElementById('upload-input');

for (var i=0; i<fileSelect.files.length; i++){
   
    var ext = fileSelect.files[i].name.substr(fileSelect.files[i].name.lastIndexOf('.')+1).toLowerCase();
    var file_size = fileSelect.files[i].size;

    if (!(ext==='txt' || ext==='text' || ext==='png' || ext==='jpg' || ext==='jpeg')) {

        alert('Error: Unsupported file type. Accepted file types: .txt, .jpg, .png.')

	} else if (file_size > 10000000){

        alert('Error: File is too large. Please make sure that file is less then 10 MB')

    } else {

        var file = $(this).get(0).files;

        if (file.length > 0) {

            var formData = new FormData();

            formData.append('uploads[]', file[i], file[i].name);

            $.ajax({
                async: true,
                url: './upload',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(data) {
                    console.log("FRONTEND: upload was successful");
                    console.log(data);
                },

                xhr: function() {

                    var xhr = new XMLHttpRequest();

                    xhr.upload.addEventListener('progress', function(evt) {
                        if(evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                            percentComplete = parseInt(percentComplete * 100);
                            console.log(percentComplete);
                        }
                    }, false);

                    return xhr;
                }
                });
        }
          

    }

}

window.location.href = "#quiz";

});
