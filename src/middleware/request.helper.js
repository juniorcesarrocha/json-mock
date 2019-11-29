module.exports = function (injector) {
    injector.addModule(requestService);

    function requestService() {
        let stackError = [];

        const httpStatusCode = {
            success: 200,
            notFound: 404,
            badRequest: 400,
            serverError: 500
        };

        const typeError = {
            data: 1,
            business: 2,
            server: 3
        };

        const severityError = {
            high: 3,
            medium: 2,
            low: 1
        }

        var service = this;
        service.result = result;
        service.throwDataValidationError = throwDataValidationError;
        service.throwBusinessValidationError = throwBusinessValidationError;
        service.throwServerError = throwServerError;
        return service;

        function result(req, res, data) {

        }

        function throwDataValidationError(session, message) {
            stackError.push({
                id: session.method + session.path,
                type: typeError.data,
                severity: severityError.low,
                message: message
            });

            stackError.push();
        }

        function throwBusinessValidationError(session, message) {
            stackError.push();
        }

        function throwServerError(session, message) {
            stackError.push();
        }
    }
};


/* 
    Helper para manipular as requisições e enviar Erros ou Resposta de sucesso.
    - Erro de Dados - throwDataValidationError
        - status: 400
        - type: 1 - DataValidationError
        - message: string
    - Erro de Negócio - throwBusinessValidationError
        - status: 400, 404
        - type: 2 - BusinessValidationError
        - message: string
    - Erro Default - throwError
        - status: 500
        - type: 0 - Error
        - message: string

    Utilizar o padrão Observable (EventEmitter) para notificar e adicionar na lista erros de tipo 1 e 2

*/

// const handleError = (err, req, res, next) => {
    
// }