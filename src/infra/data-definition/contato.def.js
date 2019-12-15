module.exports = function (injector) {
    injector.addModule(contatoDef);

    function contatoDef() {
        var entity = this;
        
        entity.def = {
            entityName: "contato",
            primaryKeyColumn: "id",
            autoincrement: true
        }

        return entity;
    }
};
