module.exports = function (injector) {
    injector.addModule(todoDef);

    function todoDef() {
        var entity = this;
        
        entity.def = {
            entityName: "todo",
            primaryKeyColumn: "idTodo",
            autoincrement: true
        }

        return entity;
    }
};
