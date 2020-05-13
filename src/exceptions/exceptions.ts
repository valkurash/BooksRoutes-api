import ApiException from './api.exception';

const exceptions = {
  userAlreadyExists: new ApiException('user already exists', 402),
};

export default exceptions;
