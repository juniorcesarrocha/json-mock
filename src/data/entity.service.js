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
        function listar(dataService, callback) {
            const jsonFile = `${entityDirectory}/${dataService.def.entityName}.json`;

            if (fs.existsSync(jsonFile)) {
                let rawdata = fs.readFileSync(jsonFile);
                return callback(null, JSON.parse(rawdata));
            }
        }

        function buscar(id, dataService, callback) {
            listar(dataService, function (err, lista) {
                const index = lista.findIndex(x => x[dataService.def.primaryKeyColumn] == id);
                if (index >= 0) return callback(null, lista[index]);

                return callback('Not Found');
            });
        }

        function inserir(data, dataService, callback) {
            listar(dataService, function (err, lista) {
                autoincrementPrimaryKey(data, lista, dataService, function (err, data) {
                    lista.push(data);

                    saveChanges(lista, dataService, function (err) {
                        return callback(null);
                    });
                })
            });
        }

        function atualizar(data, dataService, callback) {
            listar(dataService, function (err, lista) {
                const index = lista.findIndex(x => x[dataService.def.primaryKeyColumn] == data[dataService.def.primaryKeyColumn]);
                if (index >= 0) {
                    lista[index] = data;
                } else {
                    return callback('Not Found!');
                }

                saveChanges(lista, dataService, function (err) {
                    return callback(null);
                });
            })
        }

        function excluir(id, dataService, callback) {
            listar(dataService, function (err, lista) {
                const index = lista.findIndex(x => x[dataService.def.primaryKeyColumn] == id);
                if (index >= 0) {
                    lista.splice(index, 1);
                } else {
                    return callback('Not Found!');
                }

                saveChanges(lista, dataService, function (err) {
                    return callback(null);
                });
            });
        }

        function autoincrementPrimaryKey(data, lista, dataService, callback) {
            const IdList = lista.map(x => x[dataService.def.primaryKeyColumn])
            const maxPk = IdList.reduce(function (a, b) {
                return Math.max(a, b);
            });

            data[dataService.def.primaryKeyColumn] = maxPk + 1;
            return callback(null, data)

        }

        function saveChanges(data, dataService, callback) {
            const jsonFile = `${entityDirectory}/${dataService.def.entityName}.json`;
            let jsonData = JSON.stringify(data, null, 2);
            fs.writeFileSync(jsonFile, jsonData);
            return callback(null);
        }
    }

};