import requestService from "./request-service";


const devicesService = {

    async getAllDevices(page: number, perPage: number) {
        const res = await requestService.get('device', {
            params: {
                page: page + 1,
                perPage,
            }
        });
        return res.data;
    }
}

export default devicesService;