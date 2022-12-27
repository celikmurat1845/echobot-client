import API_URL from "../config";


export default class ChatService {
    constructor(request) {
        this.request = request;
    }

    // send user's message 
    sendCustomerMessage(payload) {
        return this.request.post(`${API_URL}/chats`, payload);
    }
}