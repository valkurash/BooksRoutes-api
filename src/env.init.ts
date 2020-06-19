import * as envalid from 'envalid';

export default function validateEnv() {
  const env = envalid.cleanEnv(process.env, {
    TYPEORM_CONNECTION: envalid.str(),
    TYPEORM_HOST: envalid.host(),
    TYPEORM_USERNAME: envalid.str(),
    TYPEORM_PASSWORD: envalid.str(),
    TYPEORM_DATABASE: envalid.str(),
    TYPEORM_PORT: envalid.port(),
    TYPEORM_SYNCHRONIZE: envalid.bool(),
    TYPEORM_LOGGING: envalid.bool(),
    JWT_SECRET: envalid.str(),
    IMAGE_HOST: envalid.str(),
    EVENT_SERVICE_ADDRESS: envalid.str(),
    AUTHORIZATION_COMPLETE_EVENT: envalid.str(),
    RESET_PASSWORD_EVENT: envalid.str(),
  });
}
