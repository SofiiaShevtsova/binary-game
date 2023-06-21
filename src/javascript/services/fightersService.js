import callApi from '../helpers/apiHelper';

class FighterService {
    #endpoint = 'fighters.json';

    #newEndpoint = '';

    async getFighters() {
        try {
            const apiResult = await callApi(this.#endpoint);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }

    async getFighterDetails(id) {
        try {
            this.#newEndpoint = `details/fighter/${id}.json`;
            const apiResult = await callApi(this.#newEndpoint);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }
}

const fighterService = new FighterService();

export default fighterService;
