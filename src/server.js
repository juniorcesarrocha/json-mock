var injector = require('dibuilder');
var express = require('express');
var server = express();
var router = express.Router();
var path = require('path');
var fs = require('fs');
var entityDirectory = path.join(__dirname, './entity');



injector.addInstance('express', express);
injector.addInstance('path', path);
injector.addInstance('router', router);
injector.addInstance('fs', fs);
injector.addInstance('entityDirectory', entityDirectory);

injector.loadModules(path.join(__dirname, './resource'));
injector.loadModules(path.join(__dirname, './infra'));
injector.loadModules(path.join(__dirname, './domain'));
injector.loadModules(path.join(__dirname, './helper'));



// Verificar a utilização de CORS

injector.build(function(){
    
    server.use(express.json())
    server.use(express.urlencoded({ extended: true }))
    
    server.use('/api', router);

    server.listen(3000, function () {
        console.log('Mock SERVER JSON listening on port 3000!');

    });
});








// var path = require('path');
// var fs = require('fs');

// let rawdata = fs.readFileSync('todo.json');
// let student = JSON.parse(rawdata);

// student.forEach(element => {
//     element.title = "teste";
// });

// let data = JSON.stringify(student, null, 2);
// fs.writeFileSync('todo.json', data);








