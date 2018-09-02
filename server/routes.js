var users = [
  { id: 1, username: "Blueanchorite", password: "password", role: 2 },
  { id: 2, username: "John", password: "password", role: 0},
  { id: 3, username: "Jane", password: "password", role: 1 },
  { id: 4, username: "Jacob", password: "password", role: 1 }
];


module.exports = function(app, path){
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname,'../dist/chat-app/index.html'));
    });

    app.get('/login', function(req, res){
        res.send({users});
});
};

