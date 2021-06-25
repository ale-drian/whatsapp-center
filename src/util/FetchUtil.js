class FetchUtil {

    static cabeceraPost(enviarData) {
        let head = {
            method: 'POST',
            body: JSON.stringify(enviarData),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return head;
    }

}

export default FetchUtil;