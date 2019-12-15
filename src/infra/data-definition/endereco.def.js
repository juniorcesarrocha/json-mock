module.exports = function (injector) {
    injector.addModule(enderecoDef);

    function enderecoDef() {
        var entity = this;
        
        entity.def = {
            entityName: "endereco",
            primaryKeyColumn: "id",
            autoincrement: true
        }

        return entity;
    }
};
