window.fbAsyncInit = function () {
    FB.init({
        appId: '1912067005700582',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.10'
    });
    FB.getLoginStatus(function(response){
        if(response.status === 'connected'){
            console.log('connected')
        } else {
            console.log('not connected');
        }
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));