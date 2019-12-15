module.exports = function (injector) {
    injector.addModule(municipioDef);

    function municipioDef() {
        var entity = this;
        
        entity.def = {
            entityName: "municipio",
            primaryKeyColumn: "id",
            autoincrement: true
        }

        return entity;
    }
};
