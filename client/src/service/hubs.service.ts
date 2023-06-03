import { Hub } from "../models/models";
import requestService from "./request-service";


const hubsService = {

    async getAllHubs(page: number, perPage: number): Promise<{ hubs: Hub[], totalItems: number }> {
        const res = await requestService.get('hub', {
            params: {
                page: page + 1,
                perPage,
            }
        });
        return res.data;
    },

    async getSingleHub(id: number): Promise<Hub> {
        const res = await requestService.get(`hub/${id}`);
        return res.data;
    },

    async disconnectDeviceFromHub(hubId: number, deviceId: number): Promise<Hub> {
        const res = await requestService.post('hub/remove-device', {
            hubId,
            deviceId,
        });
        return res.data;
    }
}

export default hubsService;