import { Provider } from 'prisma/generated/client';
import { ProviderDto } from '../dto/provider.dto';

const providerToProviderDto = (provider: Provider): ProviderDto => {
  return {
    id: provider.id,
    name: provider.name,
    email: provider.email,
    phone: provider.phone,
    longitude: provider.longitude,
    latitude: provider.latitude,
    image: provider.image,
    createdAt: provider.createdAt,
  };
};
const providersToProvidersDto = (providers: Provider[]): ProviderDto[] => {
  return providers.map((provider) => providerToProviderDto(provider));
};
export { providerToProviderDto, providersToProvidersDto };

export default { providerToProviderDto, providersToProvidersDto };
