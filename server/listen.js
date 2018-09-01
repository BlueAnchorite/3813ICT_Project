var host = process.env.IP;
var port = process.env.PORT;

module.exports = function(http){
    var server = http.listen(port,host,function(){
        console.log('Server listening on ' + host + ':' + port);
    });
};
