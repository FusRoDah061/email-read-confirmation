export interface IpLocationDto {
  city: string;
  state: string;
  countryCode: string;
}

export default interface IpLocationProvider {
  get(ipAddress: string): Promise<IpLocationDto>;
}
