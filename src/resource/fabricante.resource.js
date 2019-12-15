module.exports = function (injector) {
    injector.addModule(fabricanteResource);

    function fabricanteResource(router, fabricanteService, requestService) {

        router.get(
            '/fabricantes', 
            listar
        );

        router.get(
            '/fabricantes/:id', 
            buscar
        );

        router.post(
            '/fabricantes', 
            inserir
        );

        router.put(
            '/fabricantes/:id', 
            atualizar
        );

        router.delete(
            '/fabricantes/:id', 
            excluir
        );
        
        async function listar(req, res, next) {
            const lista = await fabricanteService.listar(req);
            requestService.result(req, res, lista, next);
        }        

        async function buscar(req, res, next) {
            const item = await fabricanteService.buscar(req, req.params.id);
            requestService.result(req, res, item, next);     
        }

        async function inserir(req, res, next) {
            var id = await fabricanteService.inserir(req, req.body);
            const data = {
                id: id
            }
            requestService.result(req, res, data, next); 
        }

        async function atualizar(req, res, next) {
            var item = await fabricanteService.atualizar(req, req.params.id, req.body);
            requestService.result(req, res, null, next);
        }

        async function excluir(req, res, next) {
            var lista = await fabricanteService.excluir(req, req.params.id);
            requestService.result(req, res, {
                lista
            }, next); 
        }
    }
};
