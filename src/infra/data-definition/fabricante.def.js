module.exports = function (injector) {
    injector.addModule(fabricanteDef);

    function fabricanteDef() {
        var entity = this;
        
        entity.def = {
            entityName: "fabricante",
            primaryKeyColumn: "id",
            autoincrement: true
        }

        return entity;
    }
};
