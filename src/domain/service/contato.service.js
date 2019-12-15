module.exports = function (injector) {
    injector.addModule(contatoService);

    function contatoService(contatoDef, entityService, notificationService) {
        //definition
        var service = this;
        service.listar = listar;
        service.buscar = buscar;
        service.inserir = inserir;
        service.atualizar = atualizar;
        service.excluir = excluir;
        return service;

        //implementation
        async function listar(session) {
            try {
                return await entityService.listar(contatoDef);
            } catch (error) {
                notificationService.throwServerError(session, error.message);
            }
        }

        async function buscar(session, id) {
            try {
                const item = await entityService.buscar(id, contatoDef);
                return item;
            } catch (error) {
                return errorHandlerService.throwServerError(session, error.message);
            }
        }

        async function inserir(session, model) {
            try {

                const item = await entityService.inserir(model, contatoDef);
                return item;

            } catch (error) {
                notificationService.throwServerError(session, error.message);
            }
        }

        async function atualizar(session, id, model) {
            try {
                const item = await entityService.atualizar(id, model, contatoDef);
                return item;

            } catch (error) {
                notificationService.throwServerError(session, error.message);
            }
        }

        async function excluir(session, id) {
            try {
                const list = await entityService.excluir(id, contatoDef);
               
                return list;
            } catch (error) {
                notificationService.throwServerError(session, error.message);
            }
        }
    }
};