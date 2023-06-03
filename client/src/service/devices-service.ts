import requestService from "./request-service";


const devicesService = {

    async getPaginatedDevices(page: number, perPage: number) {
        const res = await requestService.get('device', {
            params: {
                page: page + 1,
                perPage,
            }
        });
        return res.data;
    },

    async getAllUnattachedDevices() {
        const res = await requestService.get('device/unattached');
        return res.data;
    }
}

export default devicesService;