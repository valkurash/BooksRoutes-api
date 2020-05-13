export interface IFacebookConfig {
  readonly login_dialog_uri: string;
  readonly access_token_uri: string;
  readonly client_id: string;
  readonly client_secret: string;
  readonly oauth_redirect_uri: string;
  readonly state: string;
}

export const facebookConfig: IFacebookConfig = {
  login_dialog_uri: 'https://www.facebook.com/v2.12/dialog/oauth',
  access_token_uri: 'https://graph.facebook.com/v2.12/oauth/access_token',
  client_id: '324072081900759',
  client_secret: '20e78041f4aafbad8ca63c58e8011613',
  oauth_redirect_uri: 'http://localhost:1337/api/auth/facebook/signin',
  state: '{fbstate}',
};

export default facebookConfig;
