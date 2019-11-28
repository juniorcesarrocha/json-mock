module.exports = function (injector) {
    injector.addModule(todoService);

    function todoService(todoData, entityService) {
        //definition
        var service = this;
        service.listar = listar;
        service.buscar = buscar;
        service.inserir = inserir;
        service.atualizar = atualizar;
        service.excluir = excluir;
        return service;

        //implementation
        async function listar() {
            try {
                return await entityService.listar(todoData);
            } catch (error) {
                throw new Error(error);
            }            
        }

        async function buscar(id) {
            try {
                return await entityService.buscar(id, todoData);
            } catch (error) {
                throw new Error(error);
            }           
        }

        async function inserir(data) {
            try {
                return await entityService.inserir(data, todoData)
            } catch (error) {
                throw new Error(error);
            }            
        }

        async function atualizar(id, data) {
            try {
                return await entityService.atualizar(id, data, todoData);    
            } catch (error) {
                throw new Error(error);
            }            
        }

        async function excluir(id) {
            try {
                return await entityService.excluir(id, todoData);
            } catch (error) {
                throw new Error(error);
            }            
        } 
    }
};
