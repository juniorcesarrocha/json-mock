module.exports = function (injector) {
    injector.addModule(ufService);

    function ufService(ufDef, entityService, notificationService) {
        //definition
        var service = this;
        service.listar = listar;
        service.buscar = buscar;
        return service;

        //implementation
        async function listar(session) {
            try {
                return await entityService.listar(ufDef);
            } catch (error) {
                notificationService.throwServerError(session, error.message);
            }
        }

        async function buscar(session, id) {
            try {
                const item = await entityService.buscar(id, ufDef);
                return item;
            } catch (error) {
                return errorHandlerService.throwServerError(session, error.message);
            }
        }
    }
};