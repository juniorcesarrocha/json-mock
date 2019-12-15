module.exports = function (injector) {
    injector.addModule(fabricanteContatoService);

    function fabricanteContatoService(fabricanteContatoDef, contatoService, entityService, notificationService) {
        //definition
        var service = this;
        service.listarPorIdFabricante = listarPorIdFabricante;
        service.inserir = inserir;
        service.atualizar = atualizar;
        service.excluir = excluir;
        return service;

        //implementation
        async function listarPorIdFabricante(session, id) {
            try {
                const lista = await entityService.listar(fabricanteContatoDef);
                const listaContatosPorFabricante = lista.filter(fc => fc.IdFabricante == id);
                let listaContatos = [];
                for (const { IdContato } of listaContatosPorFabricante) {
                    const contato = await contatoService.buscar(session, IdContato);
                    listaContatos.push(contato);
                }

                return listaContatos;

            } catch (error) {
                notificationService.throwServerError(session, error.message);
            }
        }

        async function inserir(session, model) {
            try {

                const item = await entityService.inserir(model, fabricanteContatoDef);
                return item;

            } catch (error) {
                notificationService.throwServerError(session, error.message);
            }
        }

        async function atualizar(session, id, model) {
            try {
                const item = await entityService.atualizar(id, model, fabricanteContatoDef);
                return item;

            } catch (error) {
                notificationService.throwServerError(session, error.message);
            }
        }

        async function excluir(session, id) {
            try {
                const list = await entityService.excluir(id, fabricanteContatoDef);
               
                return list;
            } catch (error) {
                notificationService.throwServerError(session, error.message);
            }
        }
    }
};