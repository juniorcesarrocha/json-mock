module.exports = function (injector) {
    injector.addModule(atualizaTodoDataValidation);

    function atualizaTodoDataValidation(notificationService) {
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
            validarId(session, model);
            validarTitle(session, model);
            validarDescription(session, model);
            validarStatus(session, model);
        }

        function setValidationResult(valid) {
            validationResultList.push(valid);
        }

        function validarId(session, model) {
            if (!model.hasOwnProperty('idTodo')) {
                notificationService.throwDataValidationError(session, 'O campo idTodo é obrigatório.');
                setValidationResult(false);
            }
        }

        function validarTitle(session, model) {
            if (!model.hasOwnProperty('title')) {
                notificationService.throwDataValidationError(session, 'O campo Title é obrigatório.');
                setValidationResult(false);
            }

            if (model.hasOwnProperty('title') && model.title.length > 10) {
                notificationService.throwDataValidationError(session, 'O campo Title não pode ser maior que 10 caracteres.');
                setValidationResult(false);
            }
        }

        function validarDescription(session, model) {
            if (!model.hasOwnProperty('description')) {
                notificationService.throwDataValidationError(session, 'O campo Description é obrigatório.');
                setValidationResult(false);
            }
            if (model.hasOwnProperty('description') && model.description.length > 50) {
                notificationService.throwDataValidationError(session, 'O campo Description não pode ser maior que 50 caracteres.');
                setValidationResult(false);
            }
        }

        function validarStatus(session, model) {
            if (!model.hasOwnProperty('status')) {
                notificationService.throwDataValidationError(session, 'O campo Status é obrigatório.');
                setValidationResult(false);
            }

            if (model.hasOwnProperty('status') && model.status != 1 && model.status != 0) {
                notificationService.throwDataValidationError(session, 'O campo Status deve ser 1 ou 0.');
                setValidationResult(false);
            }
                
        }
    }
};
