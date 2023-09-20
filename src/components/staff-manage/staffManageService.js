import * as httpHelperService from '@/api/httpHelper';
import jwt_decode from 'jwt-decode';
import Config from '@/utils/config';

const getStaffApi = Config.serverUrl + 'api/users/getStaff';
const addStaffApi = '/api/users/addNewStaff';

export const getStaff = async (myFieldInfo) => {
    const response = await httpHelperService.authJsonPost(getStaffApi, myFieldInfo);
    if( response ) {
        return response;
    }
}

export const addStaff = async (newStaff) => {
    const response = await httpHelperService.authJsonPost(addStaffApi, newStaff);
    if( response ) {
        return response;
    }
}