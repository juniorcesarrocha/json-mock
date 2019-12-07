module.exports = function (injector) {
    injector.addModule(todoBusinessValidation);

    function todoBusinessValidation(notificationService) {
        let validationResultList = [];

        var validation = this;
        validation.isValid = isValid;
        return validation;

        function isValid(session, model) {
            applyValidation(session, model);
            if (validationResultList.length == 0) return true;
            return (!validationResultList.filter(res => res == false).length > 0);
        }

        function applyValidation(session, model) {
            validarDescription(session, model);
        }

        function setValidationResult(valid) {
            validationResultList.push(valid);
        }

        function validarDescription(session, model) {
            if (model.description && model.description.indexOf('teste') > -1) {
                notificationService.throwBusinessValidationError(session, 'O campo Description não pode conter a palavra teste.');
                setValidationResult(false);
            }
        }
    }
};
