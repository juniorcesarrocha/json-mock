module.exports = function (injector) {
    injector.addModule(todoService);

    function todoService(todoData, entityService, todoDataValidation, todoBusinessValidation, notificationService) {
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
                return await entityService.listar(todoData);
            } catch (error) {
                notificationService.throwServerError(session, error);
            }
        }

        async function buscar(session, id) {
            try {
                const item = await entityService.buscar(id, todoData);
                if (!item) {
                    notificationService.throwNotFoundError(session, 'Todo não encontrado.');
                    return;
                }
                return await entityService.buscar(id, todoData);
            } catch (error) {
                return errorHandlerService.throwServerError(session, error);
            }
        }

        async function inserir(session, model) {
            try {

                const isDataValidation = todoDataValidation.isValid(session, model);
                const isBusinessValidation = todoBusinessValidation.isValid(session, model);

                if (!isDataValidation || !isBusinessValidation) return;

                return await entityService.inserir(data, todoData);
            } catch (error) {
                notificationService.throwServerError(session, error);
            }
        }

        async function atualizar(session, id, model) {
            try {
                if (!todoDataValidation.isValid(session, model))
                    return;
                if (!todoBusinessValidation.isValid(session, model))
                    return;

                return await entityService.atualizar(id, model, todoData);
            } catch (error) {
                notificationService.throwServerError(session, error);
            }
        }

        async function excluir(session, id) {
            try {
                const list = await entityService.excluir(session, id, todoData);
                if (!list) {
                    notificationService.throwNotFoundError(session, 'Todo não pode ser excluído.');
                    return;
                }

                return await entityService.excluir(id, todoData);
            } catch (error) {
                notificationService.throwServerError(session, error);
            }
        }
    }
};