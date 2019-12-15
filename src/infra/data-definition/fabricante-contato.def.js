module.exports = function (injector) {
    injector.addModule(fabricanteContatoDef);

    function fabricanteContatoDef() {
        var entity = this;
        
        entity.def = {
            entityName: "fabricante-contato",
            primaryKeyColumn: "id",
            autoincrement: true
        }

        return entity;
    }
};
