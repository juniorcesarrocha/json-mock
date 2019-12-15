module.exports = function (injector) {
    injector.addModule(enderecoService);

    function enderecoService(enderecoDef, municipioService, entityService, notificationService) {
        //definition
        var service = this;
        service.buscarPorId = buscarPorId;
        service.inserir = inserir;
        service.atualizar = atualizar;
        return service;

        //implementation
        async function buscarPorId(session, id) {
            try {
                const endereco = await entityService.buscar(id, enderecoDef);
                const municipio = await municipioService.buscar(session, endereco.municipioId);
                endereco.municipio = municipio;

                return endereco;
            } catch (error) {
                return errorHandlerService.throwServerError(session, error.message);
            }
        }

        async function inserir(session, model) {
            try {

                const item = await entityService.inserir(model, enderecoDef);
                return item;

            } catch (error) {
                notificationService.throwServerError(session, error.message);
            }
        }

        async function atualizar(session, id, model) {
            try {
                const item = await entityService.atualizar(id, model, enderecoDef);
                return item;

            } catch (error) {
                notificationService.throwServerError(session, error.message);
            }
        }
    }
};