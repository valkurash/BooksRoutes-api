export interface IVkontakteConfig {
  readonly client_id: string;
  readonly client_secret: string;
  readonly oauth_redirect_uri: string;
}

export const vkontakteConfig: IVkontakteConfig = {
  client_id: '7233728',
  client_secret: 'uz7wyyAbPurOCbSWN0Ou',
  oauth_redirect_uri: 'http://localhost:1337/api/auth/vk',
};

export default vkontakteConfig;
