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
            try {
                const jsonFile = `${entityDirectory}/${dataService.def.entityName}.json`;

                if (fs.existsSync(jsonFile)) {
                    let rawdata = fs.readFileSync(jsonFile);
                    return JSON.parse(rawdata);
                }
            } catch (error) {
                throw new Error(`Error: ${error}`);
            }
        }

        async function buscar(id, dataService) {
            try {
                const lista = await listar(dataService);
                const index = lista.findIndex(x => x[dataService.def.primaryKeyColumn] == id);
                if (index >= 0) return lista[index];
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
            return data[dataService.def.primaryKeyColumn];
        }

        async function atualizar(data, dataService, callback) {
            try {
                const lista = await listar(dataService);
                const index = lista.findIndex(x => x[dataService.def.primaryKeyColumn] == data[dataService.def.primaryKeyColumn]);
                lista[index] = data;
                await saveChanges(lista, dataService);
                return null
            } catch (error) {
                return callback('Not Found!');
            }
        }

        async function excluir(id, dataService, callback) {
            try {
                const lista = await listar(dataService);
                const index = lista.findIndex(x => x[dataService.def.primaryKeyColumn] == id);
                lista.splice(index, 1);
                await saveChanges(lista, dataService);
                return null;
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
            try {
                const jsonFile = `${entityDirectory}/${dataService.def.entityName}.json`;
                let jsonData = JSON.stringify(data, null, 2);
                fs.writeFileSync(jsonFile, jsonData);
                return null;
            } catch (error) {
                throw new Error(`Error: ${error}`);
            }           
        }
    }

};