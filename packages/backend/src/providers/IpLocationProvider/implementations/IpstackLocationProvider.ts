/* eslint-disable camelcase */
import axios from 'axios';
import IpLocationProvider, {
  IpLocationDto,
} from '../models/IpLocationProvider';

interface IpstackResponse {
  country_code: string;
  region_name: string;
  city: string;
}

export default class IpstackLocationProvider implements IpLocationProvider {
  public async get(ipAddress: string): Promise<IpLocationDto> {
    const api = axios.create({
      baseURL: 'http://api.ipstack.com',
      params: {
        access_key: process.env.IPSTACK_API_KEY,
      },
    });

    const response = await api.get<IpstackResponse>(`/${ipAddress}`);

    const { city, country_code, region_name } = response.data;

    return {
      city,
      countryCode: country_code,
      state: region_name,
    };
  }
}
