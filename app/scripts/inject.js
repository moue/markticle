$(document).ready(function() {

    $(document.body).append('<button id="markticle_button" style="position: fixed; z-index: 9999; bottom: 20px; left: 20px;">MARK ME</button>');

    $(document).on('click', '#markticle_button', function() {
        var title = document.title;
        var url = window.location.href;
        console.log(title + ': ' + url);
        
        chrome.extension.sendMessage({
            action : 'add',
            data: {
              title: title,
              url: url
            }
        });
        alert('Marked!');
    });
    
});