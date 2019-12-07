module.exports = function (injector) {
    injector.addModule(requestService);

    function requestService() {
        let stackError = [];
        let stackMessage = [];

        const httpStatusCode = {
            success: 200,
            badRequest: 400,
            notFound: 404,
            serverError: 500
        };

        var service = this;
        service.result = result;
        service.notifyError = notifyError;
        service.notifyMessage = notifyMessage;
        return service;

        function result(req, res, data, next) {
            const errorList = findErrorById(req, stackError);

            if (errorList.length > 0) {
                const statusCodeError = findStatusError(errorList);

                const id = `${req.method}#${req.path}`;
                stackError.filter(x => x.id == id).forEach(function(error, index) {
                    stackError.splice(index, 1);
                });

                return res.status(statusCodeError).send(errorList);
            }

            if (stackMessage.length > 0) {
                return res.status(httpStatusCode.success).send({
                    notification: stackMessage,
                    data: data
                });
            }

            return res.status(httpStatusCode.success).send(data);
        }

        function notifyError(error) {
            stackError.push(error);
        }

        function notifyMessage(message) {
            stackMessage.push(message);
        }

        function findStatusError(errorList) {
            const serverError = errorList.findIndex(e => e.statusCode == httpStatusCode.serverError);
            const badRequest = errorList.findIndex(e => e.statusCode == httpStatusCode.badRequest);
            const notFound = errorList.findIndex(e => e.statusCode == httpStatusCode.notFound);

            if (serverError >= 0) return httpStatusCode.serverError;
            if (badRequest >= 0) return httpStatusCode.badRequest;
            if (notFound >= 0) return httpStatusCode.notFound;
        }

        function findErrorById(session, errorList) {
            const id = `${session.method}#${session.path}`;
            return errorList.filter(x => x.id == id);
        }
    }
};