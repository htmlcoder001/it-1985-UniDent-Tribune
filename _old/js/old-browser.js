//Per Icycool, one liner
//function isIE(){
//                 return window.navigator.userAgent.match(/(MSIE|Trident)/);
//               }

function isIE() {
    const ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
    const msie = ua.indexOf('MSIE '); // IE 10 or older
    const trident = ua.indexOf('Trident/'); //IE 11
    
    return (msie > 0 || trident > 0);
}


//function to show alert if it's IE
function ShowIEAlert(){
    if(isIE()){
       window.location.replace("https://www.dental-tribune.com/update-browser/");
    }
}

ShowIEAlert(); 