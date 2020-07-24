const randomNumber = function(){
    var a = 'azxcvbnmsdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP0123456789';
    var b = '';
    for (var i = 0; i < 5; i++) {
        var index = Math.floor(Math.random() * 62);
        b += a.charAt(index);
    }
    return b;
}
export default randomNumber