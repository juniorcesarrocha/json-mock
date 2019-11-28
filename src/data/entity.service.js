module.exports = function (injector) {
    injector.addModule(entityService);

    function entityService(fs, entityDirectory) {

        //additional definitions
        var service = this;
        service.listar = listar;
        service.buscar = buscar;
        service.inserir = inserir;
        service.atualizar = atualizar;
        service.excluir = excluir;
        return service;

        //custom implementation

        async function listar(dataService) {
            return new Promise((resolve, reject) => {
                
                const jsonFile = getFile(dataService);

                fs.stat(jsonFile, function(error) {
                    if (error) return reject(error);

                    fs.readFile(jsonFile, function (error, data) {
                        if (error) return reject(error);
                        resolve(JSON.parse(data));
                    }); 
                });
            });
        }

        async function buscar(id, dataService) {
            try {
                const lista = await listar(dataService);
                const index = lista.findIndex(x => x[dataService.def.primaryKeyColumn] == id);
                if (index >= 0) return lista[index];
                if (index < 0) return {};

            } catch (error) {
                throw new Error(`Error: Not Found`);
            }
        }

        async function inserir(data, dataService) {
            const lista = await listar(dataService);

            if (dataService.def.autoincrement) {
                data = autoincrementPrimaryKey(data, lista, dataService);
            }

            lista.push(data);

            await saveChanges(lista, dataService);
            return data;
        }

        async function atualizar(id, data, dataService) {
            try {
                const lista = await listar(dataService);
                const index = lista.findIndex(x => x[dataService.def.primaryKeyColumn] == id);
                if (index < 0) throw new Error(`Error: Not Found`);

                lista[index] = data;
                await saveChanges(lista, dataService);
                return data;
            } catch (error) {
                throw new Error(`Error: ${error}`);
            }
        }

        async function excluir(id, dataService, callback) {
            try {
                const lista = await listar(dataService);
                const index = lista.findIndex(x => x[dataService.def.primaryKeyColumn] == id);
                lista.splice(index, 1);
                await saveChanges(lista, dataService);
                return lista;
            } catch (error) {
                throw new Error(`Error: ${error}`);
            }
        }

        function autoincrementPrimaryKey(data, lista, dataService) {
            const IdList = lista.map(x => x[dataService.def.primaryKeyColumn])
            const maxPk = IdList.reduce(function (a, b) {
                return Math.max(a, b);
            });

            data[dataService.def.primaryKeyColumn] = maxPk + 1;
            return data;
        }

        async function saveChanges(data, dataService) {
            return new Promise((resolve, reject) => {
                
                const jsonFile = getFile(dataService);

                fs.stat(jsonFile, function(error) {
                    if (error) return reject(error);

                    let jsonData = JSON.stringify(data, null, 2);
                    fs.writeFile(jsonFile, jsonData, function(error) {
                        if (error) return reject(error);
                        resolve();
                    }); 
                });
            });                   
        }

        function getFile(dataService) {            
            return `${entityDirectory}/${dataService.def.entityName}.json`;
        }
    }

};