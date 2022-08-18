/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    let queryParams = '';

    if (options.data) {
        if (options.method === 'GET') {
            queryParams ='?' + Object.entries(options.data).map(
                ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
                ).join('&');
        } else {
            Object.entries(options.data).forEach(item => formData.append(...item));
        }
    };

    
    try {
        xhr.open(options.method, options.url + queryParams, true);
        xhr.responseType = 'json';
        xhr.send(formData);
    } catch {
        options.callback(error);
    }
    

    xhr.addEventListener('load', () => {
        let error = null;
        let response = null;
        
        if (xhr.status === 200) {
            response = xhr.response;
            } else {
                throw new Error(xhr.status);
            }
            options.callback(error, response);
    });
    
    return xhr; 
};

