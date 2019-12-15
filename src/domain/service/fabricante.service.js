module.exports = function (injector) {
    injector.addModule(fabricanteService);

    function fabricanteService(fabricanteDef, enderecoService, fabricanteContatoService, entityService, notificationService) {
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
                let listaFabricantes = await entityService.listar(fabricanteDef);
                
                for (const fabricante of listaFabricantes) {
                    const endereco = await enderecoService.buscarPorId(session, fabricante.idEndereco)
                    fabricante.fabricanteEndereco = endereco;
                    const contatos = await fabricanteContatoService.listarPorIdFabricante(session, fabricante.id);
                    fabricante.fabricanteContatos = contatos;
                }

                return listaFabricantes.map(f => { return {
                    razaoSocial: f.razaoSocial,
                    cnpj: f.cnpj,
                    indAtivo: f.indAtivo,
                    fabricanteEndereco: f.fabricanteEndereco,
                    fabricanteContatos: f.fabricanteContatos
                } });
                
            } catch (error) {
                notificationService.throwServerError(session, error.message);
            }
        }

        async function buscar(session, id) {
            try {
                const item = await entityService.buscar(id, fabricanteDef);
                return item;
            } catch (error) {
                return errorHandlerService.throwServerError(session, error.message);
            }
        }

        async function inserir(session, model) {
            try {

                const item = await entityService.inserir(model, fabricanteDef);
                return item;

            } catch (error) {
                notificationService.throwServerError(session, error.message);
            }
        }

        async function atualizar(session, id, model) {
            try {
                const item = await entityService.atualizar(id, model, fabricanteDef);
                return item;

            } catch (error) {
                notificationService.throwServerError(session, error.message);
            }
        }

        async function excluir(session, id) {
            try {
                const list = await entityService.excluir(id, fabricanteDef);
               
                return list;
            } catch (error) {
                notificationService.throwServerError(session, error.message);
            }
        }
    }
};