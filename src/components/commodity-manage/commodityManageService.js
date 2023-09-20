import * as httpHelperService from '@/api/httpHelper';
import jwt_decode from 'jwt-decode';
import Config from '@/utils/config';

const getFieldApi = Config.serverUrl + 'api/commodity/get/field';
const addFieldApi = Config.serverUrl + 'api/commodity/add/field';
const addShopApi = Config.serverUrl + 'api/commodity/add/shop';
const getCommodityApi = Config.serverUrl + 'api/commodity/get/commodity';
const addCommodityApi = Config.serverUrl + 'api/commodity/add/commodity';
const addFigureApi = Config.serverUrl + 'api/commodity/add/figure';

export const getFields = async () => {
    const response = await httpHelperService.authJsonGet(getFieldApi);
    if( response ) {
        return response;
    }
}