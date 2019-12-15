module.exports = function (injector) {
    injector.addModule(ufDef);

    function ufDef() {
        var entity = this;
        
        entity.def = {
            entityName: "uf",
            primaryKeyColumn: "id",
            autoincrement: true
        }

        return entity;
    }
};
