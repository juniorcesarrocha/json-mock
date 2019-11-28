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
            '/todo/:id', 
            atualizar
        );

        router.delete(
            '/todo/:id', 
            excluir
        );
        
        async function listar(req, res, next) {
            try {
                const lista = await todoService.listar();
                return res.send(lista);
                next();
            } catch (error) {
                return res.status(500).send(error);
            }            
        }        

        async function buscar(req, res, next) {
            try {
                const item = await todoService.buscar(req.params.id);
                return res.send(item);
                next()
            } catch (error) {
                res.status(404).send(error);
            }            
        }

        async function inserir(req, res, next) {
            try {
                var item = await todoService.inserir(req.body);
                return res.send(item);
                next();
            } catch (error) {
                return res.status(500).send(error);
            }            
        }

        async function atualizar(req, res, next) {
            try {
                var item = await todoService.atualizar(req.params.id, req.body);
                return res.send(item);
                next();
            } catch (error) {
                return res.status(500).send(error);
            }
        }

        async function excluir(req, res, next) {
            try {
                var lista = await todoService.excluir(req.params.id);
                return res.send(lista);
                next();
            } catch (error) {
                return res.status(500).send(error);
            }            
        }
    }
};
