const fs = require('fs');

var groups = [];

var channels = [];

var users = [];

function loadData() {
    fs.readFile('users.txt', function(err, data) {
        if (err) throw err;
        users = JSON.parse(data);
    });
    
    fs.readFile('channels.txt', function(err, data) {
        if (err) throw err;
        channels = JSON.parse(data);
    });
    
    fs.readFile('groups.txt', function(err, data) {
        if (err) throw err;
        groups = JSON.parse(data);
    });
    
    console.log("Data loaded!");
}

loadData();

function saveData() {
    saveUsers();
    saveGroups();
    saveChannels();
}

function saveUsers() {
    fs.writeFile('users.txt', JSON.stringify(users), function (err) {
        if (err) throw err;
    });    
}

function saveChannels() {
    fs.writeFile('channels.txt', JSON.stringify(channels), function (err) {
        if (err) throw err;
    }); 
}

function saveGroups() {
    fs.writeFile('groups.txt', JSON.stringify(groups), function (err) {
        if (err) throw err;
    });
}

module.exports = function(app, path){
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname,'../dist/chat-app/index.html'));
    });

    //get a user by id
    app.get('/api/user/:id', function(req, res){
        var user = users[req.params['id'] - 1];
        res.send({user});
    });

    //get all users (parse list to only send username and extra infor, don't send password details)
    app.get('/api/users', function(req, res){
        res.send({users});
    });
    
    //get all groups
    app.get('/api/groups', function(req, res){
        res.send({groups});
    });
    
    //get a group by id
    app.get('/api/groups/:id', function(req, res){
        var group = groups[req.params['id'] - 1];
        res.send({group});
    });
    
    //get all channels
    app.get('/api/channels', function(req, res){
        res.send({channels});
    });
    
    //get a single channel by id
    app.get('/api/channels/:id', function(req, res){
        var channel = channels[req.params['id'] - 1];
        res.send({channel});
    });
    
    //get all of a groups channels
    app.get('/api/groups/:group_id/channels', function(req, res){
        var select_channels = [];
        for (let i = 0; i < groups.length; i++) { 
            if (channels[i].parent_group == req.params['group_id']) {
                select_channels.push(channels[i]);
            }
        }    
        res.send({select_channels});
    });
    
    //get a channel within the chosen group
    app.get('/api/groups/:group_id/channels/:channel_id', function(req, res){
        var select_channels = [];
        for (let i = 0; i < groups.length; i++) { 
            if (channels[i].parent_group == req.params['group_id']) {
                select_channels.push(channels[i]);
            }
        }
        for (let i = 0; i < select_channels.length; i++) { 
            if (select_channels[i].channel_id == req.params['channel_id']) {
                var channel = select_channels[i];
            }
        }
        res.send({channel});
    });
    
    //Save all data via saveData() whenever the below routes are called
    //need 3 POST paths for creating users/channels/groups
    app.post('/api/users', function (req, res) {
        let id = 1;
        if (users.length > 0) {
            let maximum = Math.max.apply(Math, users.map(function (f) { return f.id; }));
            id = maximum + 1;
        }
        let newUser = {"id": id, "username": req.body.username, "password": req.body.password, "role": req.body.role};
        
        users.push(newUser);
        saveUsers();
        res.send(newUser);
    });
    
    app.post('/api/groups', function (req, res) {
        let id = 1;
        if (groups.length > 0) {
            let maximum = Math.max.apply(Math, groups.map(function (f) { return f.id; }));
            id = maximum + 1;
        }
        let newGroup = {"id": id, "group_name": req.body.group_name};
        
        groups.push(newGroup);
        saveGroups();
        res.send(newGroup);
    });
    
    app.post('/api/groups/:group_id/channels', function (req, res) {
        let id = 1;
        if (channels.length > 0) {
            let maximum = Math.max.apply(Math, channels.map(function (f) { return f.id; }));
            id = maximum + 1;
        }
        
        var select_channels = [];
        for (let i = 0; i < groups.length; i++) { 
            if (channels[i].parent_group == req.params['group_id']) {
                select_channels.push(channels[i]);
            }
        }
        
        let channel_id = 1;
        if (select_channels.length > 0) {
            let maximum = Math.max.apply(Math, select_channels.map(function (f) { return f.id; }));
            channel_id = maximum + 1;
        }
        
        let newChannel = {"id": id, "channel_name": req.body.channel_name, "channel_id": channel_id, "parent_group": req.params['group_id']};
        
        channels.push(newChannel);
        saveChannels();
        res.send(newChannel);
    });
    
    //need 3 PUT paths for updating users/channels/group
    app.put('/api/users/:id', function (req, res) {
        let id = req.params.id;
        let s = users.find(x => x.id == id);
        
        s.username = req.body.username;
        s.password = req.body.password;
        s.role = req.body.role;

        res.send(s);

    });
    
    app.put('/api/groups/:id', function (req, res) {
        let id = req.params.id;
        let s = users.find(x => x.id == id);
        
        s.username = req.body.username;
        s.password = req.body.password;
        s.role = req.body.role;

        res.send(s);

    });
    
    app.put('/api/groups/:group_id/channels/:channel_id', function (req, res) {
        let group_id = req.params.group_id;
        let channel_id = req.params.channel_id;
        let s = channels.find(function(element) {
            return element == group_id && element == channel_id;
        });
        
        s.channel_name = req.body.channel_name;
        res.send(s);

    });
    //need 3 DELETE paths
};

