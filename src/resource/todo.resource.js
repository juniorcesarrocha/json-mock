module.exports = function (injector) {
    injector.addModule(todoResource);

    function todoResource(router, todoService) {

        router.get(
            '/todo', 
            listar
        );

        router.get(
            '/todo/:id', 
            buscar
        );

        router.post(
            '/todo', 
            inserir
        );

        router.put(
            '/todo', 
            atualizar
        );

        router.delete(
            '/todo/:id', 
            excluir
        );

        function listar(req, res, next) {
            todoService.listar(function(err, lista) {
                if (err) return res.send(err);

                return res.send(lista);
                next()
            })
        }

        function buscar(req, res, next) {
            todoService.buscar(req.params.id, function(err, item) {
                if (err) return res.status(404).send(err);

                return res.send(item);
                next()
            })
        }

        function inserir(req, res, next) {
            todoService.inserir(req.body, function(err) {
                if (err) return res.send(err);

                return res.send(null);
                next()
            })
        }

        function atualizar(req, res, next) {
            todoService.atualizar(req.body, function(err) {
                if (err) return res.send(err);

                return res.send(null);
                next()
            })
        }

        function excluir(req, res, next) {
            todoService.excluir(req.params.id, function(err, item) {
                if (err) return res.status(404).send(err);

                return res.send(null);
                next()
            })
        }
    }
};
