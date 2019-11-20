module.exports = function (injector) {
    injector.addModule(todoService);

    function todoService(todoData, entityService) {
        //definition
        var service = this;
        service.listar = listar;
        service.buscar = buscar;
        service.inserir = inserir;
        service.atualizar = atualizar;
        service.excluir = excluir;
        return service;

        //implementation
        function listar(callback) {
            entityService.listar(todoData, function(err, lista) {
                if (err) return callback(err);

                return callback(null, lista);
            });
        }    

        function buscar(id, callback) {
            entityService.buscar(id, todoData, function(err, item) {
                if (err) return callback(err);

                return callback(null, item);
            });
        }    
        
        function inserir(data, callback) {
            entityService.inserir(data, todoData, function(err) {
                if (err) return callback(err);

                return callback(null);
            });
        }

        function atualizar(data, callback) {
            entityService.atualizar(data, todoData, function(err) {
                if (err) return callback(err);

                return callback(null);
            });
        }

        function excluir(id, callback) {
            entityService.excluir(id, todoData, function(err) {
                if (err) return callback(err);

                return callback(null);
            });
        } 
    }
};
