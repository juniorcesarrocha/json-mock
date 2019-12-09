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
            const messageList = findErrorById(req, stackMessage);

            if (errorList.length > 0) {
                const statusCodeError = findStatusError(errorList);

                const id = `${req.method}#${req.path}`;
                stackError.filter(x => x.id == id).forEach(function(error, index) {
                    stackError.splice(index, 1);
                });

                const messageErrorList = errorList.map(e => e.message);

                responseError = {
                    Errors: messageErrorList
                };

                return res.status(statusCodeError).send({
                    success: false,
                    notifications: responseError
                });
            }

            if (messageList.length > 0) {

                const id = `${req.method}#${req.path}`;
                stackMessage.filter(x => x.id == id).forEach(function(error, index) {
                    stackMessage.splice(index, 1);
                });

                const warningList = messageList.filter(m => m.type == 'Warning').map(e => e.message);

                const informationList = messageList.filter(m => m.type == 'Information').map(e => e.message);
    
                responseMessage  = {
                    Warning: warningList,
                    Information: informationList
                };

                return res.status(httpStatusCode.success).send({
                    success: true,
                    notifications: responseMessage,
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