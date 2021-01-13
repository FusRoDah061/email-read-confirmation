import { container } from 'tsyringe';
import IpstackLocationProvider from './implementations/IpstackLocationProvider';
import IpLocationProvider from './models/IpLocationProvider';

container.registerInstance<IpLocationProvider>(
  'IpLocationProvider',
  container.resolve(IpstackLocationProvider),
);
