module.exports = function (injector) {
    injector.addModule(todoService);

    function todoService(todoDef, entityService, novoTodoDataValidation, atualizaTodoDataValidation, todoBusinessValidation, notificationService) {
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
                return await entityService.listar(todoDef);
            } catch (error) {
                notificationService.throwServerError(session, error.message);
            }
        }

        async function buscar(session, id) {
            try {
                const item = await entityService.buscar(id, todoDef);
                if (!item) {
                    notificationService.throwNotFoundError(session, 'Todo não encontrado.');
                    return;
                }
                return await entityService.buscar(id, todoDef);
            } catch (error) {
                return errorHandlerService.throwServerError(session, error.message);
            }
        }

        async function inserir(session, model) {
            try {

                const isDataValidation = novoTodoDataValidation.isValid(session, model);
                const isBusinessValidation = todoBusinessValidation.isValid(session, model);

                if (!isDataValidation || !isBusinessValidation) return;
                const item = await entityService.inserir(model, todoDef);

                notificationService.throwDataInfomationMessage(session, 'Registro inserido com sucesso!');

                return item.idTodo;
            } catch (error) {
                notificationService.throwServerError(session, error.message);
            }
        }

        async function atualizar(session, id, model) {
            try {
                if (!atualizaTodoDataValidation.isValid(session, model))
                    return;
                if (!todoBusinessValidation.isValid(session, model))
                    return;

                const item = await entityService.atualizar(id, model, todoDef);
                notificationService.throwDataInfomationMessage(session, 'Registro alterado com sucesso!');
                return item;

            } catch (error) {
                notificationService.throwServerError(session, error.message);
            }
        }

        async function excluir(session, id) {
            try {
                const list = await entityService.excluir(id, todoDef);
                if (!list) {
                    notificationService.throwNotFoundError(session, 'Todo não pode ser excluído.');
                    return;
                }

                return list;
            } catch (error) {
                notificationService.throwServerError(session, error.message);
            }
        }
    }
};