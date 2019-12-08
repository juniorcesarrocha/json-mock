module.exports = function (injector) {
    injector.addModule(todoResource);

    function todoResource(router, todoService, requestService) {

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
            const lista = await todoService.listar(req);
            requestService.result(req, res, lista, next);
        }        

        async function buscar(req, res, next) {
            const item = await todoService.buscar(req, req.params.id);
            requestService.result(req, res, item, next);     
        }

        async function inserir(req, res, next) {
            var id = await todoService.inserir(req, req.body);
            const data = {
                id: id
            }
            requestService.result(req, res, data, next); 
        }

        async function atualizar(req, res, next) {
            var item = await todoService.atualizar(req, req.params.id, req.body);
            requestService.result(req, res, null, next);
        }

        async function excluir(req, res, next) {
            var lista = await todoService.excluir(req, req.params.id);
            requestService.result(req, res, {
                lista
            }, next); 
        }
    }
};
