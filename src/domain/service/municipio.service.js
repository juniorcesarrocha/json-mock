module.exports = function (injector) {
    injector.addModule(municipioService);

    function municipioService(municipioDef, ufService, entityService, notificationService) {
        //definition
        var service = this;
        service.listarPorIdUf = listarPorIdUf;
        service.buscar = buscar;
        return service;

        //implementation
        async function listarPorIdUf(idUf, session) {
            try {
                const lista = await entityService.listar(municipioDef);
                return lista.filter(m => m.ufId == idUf);
            } catch (error) {
                notificationService.throwServerError(session, error.message);
            }
        }

        async function buscar(session, id) {
            try {
                let municipio = await entityService.buscar(id, municipioDef);
                municipio.uf = await ufService.buscar(session, municipio.ufId);
                return municipio;
            } catch (error) {
                return errorHandlerService.throwServerError(session, error.message);
            }
        }
    }
};