module.exports = function (injector) {
    injector.addModule(todoData);

    function todoData() {
        var entity = this;
        
        entity.def = {
            entityName: "todo",
            primaryKeyColumn: "idTodo",
            autoincrement: true
        }

        return entity;
    }
};
