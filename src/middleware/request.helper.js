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

const handleError = (err, req, res, next) => {
    
}