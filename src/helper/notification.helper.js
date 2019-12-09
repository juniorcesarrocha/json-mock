module.exports = function (injector) {
    injector.addModule(notificationService);

    function notificationService(requestService) {
      
        const httpStatusCode = {
            success: 200,
            notFound: 404,
            badRequest: 400,
            serverError: 500
        };

        const type = {
            Info: 1,
            warning: 2,
            error: 3
        }

        const typeValidation = {
            data: 1,
            business: 2,
            server: 3
        };

        const severityError = {
            high: 3,
            medium: 2,
            low: 1
        }

        const typeDescription = {
            httpStatusCode: {
                success: 'Sucesso',
                notFound: 'Não encontrado',
                badRequest: 'Falha na requisição',
                serverError: 'Erro no servidor'
            },
            type: {
                Info: 'Information',
                warning: 'Warning',
                error: 'Errors'
            },
            typeValidation: {
                data: 'Dados',
                business: 'Negócio',
                server: 'Servidor'
            },
            severityError: {
                high: 'Alta',
                medium: 'Média',
                low: 'Baixa'
            }
        }

        var service = this;
        service.throwDataInfomationMessage = throwDataInfomationMessage;
        service.throwBusinessInfomationMessage = throwBusinessInfomationMessage;
        service.throwDataWarningMessage = throwDataWarningMessage;
        service.throwBusinessWarningnMessage = throwBusinessWarningnMessage;
        service.throwDataValidationError = throwDataValidationError;
        service.throwNotFoundError = throwNotFoundError;
        service.throwBusinessValidationError = throwBusinessValidationError;
        service.throwServerError = throwServerError;
        return service;
        
        function throwDataInfomationMessage(session, message) {
            const notfy = {
                id: `${session.method}#${session.path}`,
                typeValidationNumber: typeValidation.data,
                typeValidation: typeDescription.typeValidation.data,
                typeNumber: type.info,
                type: typeDescription.type.Info,
                severityNumber: severityError.low,
                severity: typeDescription.severityError.low,
                statusCodeNumber: httpStatusCode.success,
                statusCode: typeDescription.httpStatusCode.success,
                message: message
            }
            
            requestService.notifyMessage(notfy);
        }

        function throwBusinessInfomationMessage(session, message) {
            const notfy = {
                id: `${session.method}#${session.path}`,
                typeValidation: typeValidation.business,
                type: type.info,
                severity: severityError.low,
                statusCode: httpStatusCode.success,
                message: message
            }
            
            requestService.notifyMessage(notfy);
        }

        function throwDataWarningMessage(session, message) {
            const notfy = {
                id: `${session.method}#${session.path}`,
                typeValidation: typeValidation.data,
                type: type.warning,
                severity: severityError.low,
                statusCode: httpStatusCode.success,
                message: message
            }
            
            requestService.notifyMessage(notfy);
        }

        function throwBusinessWarningnMessage(session, message) {
            const notfy = {
                id: `${session.method}#${session.path}`,
                typeValidation: typeValidation.business,
                type: type.warning,
                severity: severityError.medium,
                statusCode: httpStatusCode.success,
                message: message
            };
            
            requestService.notifyMessage(notfy);
        }

        function throwDataValidationError(session, message) {
            const notfy = {
                id: `${session.method}#${session.path}`,
                typeValidation: typeValidation.data,
                type: type.error,
                severity: severityError.low,
                statusCode: httpStatusCode.badRequest,
                message: message
            };

            requestService.notifyError(notfy);
        }

        function throwNotFoundError(session, message) {
            const notfy = {
                id: `${session.method}#${session.path}`,
                typeValidation: typeValidation.data,
                type: type.error,
                severity: severityError.low,
                statusCode: httpStatusCode.notFound,
                message: message
            };

            requestService.notifyError(notfy);
        }

        function throwBusinessValidationError(session, message) {
            const notfy = {
                id: `${session.method}#${session.path}`,
                typeValidation: typeValidation.business,
                type: type.error,
                severity: severityError.medium,
                statusCode: httpStatusCode.badRequest,
                message: message
            };

             requestService.notifyError(notfy);
        }

        function throwServerError(session, message) {
            const notfy = {
                id: `${session.method}#${session.path}`,
                typeValidation: typeValidation.server,
                type: type.error,
                severity: severityError.high,
                statusCode: httpStatusCode.serverError,
                message: message
            };

            requestService.notifyError(notfy);
        }
    }
};
