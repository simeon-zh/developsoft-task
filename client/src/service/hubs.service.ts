import requestService from "./request-service";


const hubsService = {

    async getAllHubs(page: number, perPage: number) {
        const res = await requestService.get('hub', {
            params: {
                page: page + 1,
                perPage,
            }
        });
        return res.data;
    }
}

export default hubsService;