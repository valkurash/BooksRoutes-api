import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  ExceptionFilter,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import BaseApiResponse from '../base/base.api.response';
import ExternalServicesException from '../exceptions/externalServicesException';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let json;
    switch (exception.constructor) {
      case HttpException:
        json = this.createJsonFromHttpExceptions(exception as HttpException);
        break;
      case BadRequestException:
        json = this.createJsonFromBadRequestExceptions(
          exception as BadRequestException,
        );
        break;

      case UnauthorizedException:
        json = this.createJsonFromUnauthorizationExceptions(
          exception as UnauthorizedException,
        );
        break;

      case ForbiddenException:
        json = this.createJsonFromForbiddenException(exception);
        break;

      case ExternalServicesException:
        json = this.createJsonFromExternalServicesException(
          exception as ExternalServicesException,
        );
        break;
    }

    if (!json) {
      json = this.createJsonFromUnknownExceptions(exception);
    }

    response.status(200).json(json);
  }

  private createJsonFromHttpExceptions(
    exception: HttpException,
  ): BaseApiResponse<string> {
    return {
      result: null,
      errorCode: exception.getStatus(),
      errorMessage: exception.toString(),
    };
  }

  private createJsonFromUnauthorizationExceptions(
    exception: UnauthorizedException,
  ): BaseApiResponse<string> {
    return {
      result: null,
      errorCode: exception.message.statusCode,
      errorMessage: exception.message.error,
    };
  }

  private createJsonFromUnknownExceptions(
    exception: Error,
  ): BaseApiResponse<string> {
    return {
      result: null,
      errorCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errorMessage: exception.message,
    };
  }

  private createJsonFromForbiddenException(
    exception: Error,
  ): BaseApiResponse<string> {
    return {
      result: null,
      errorCode: HttpStatus.FORBIDDEN,
      errorMessage:
        'Доступ запрещен. Для предоставления доступа, напишите администратору',
    };
  }

  private createJsonFromBadRequestExceptions(
    exception: BadRequestException,
  ): BaseApiResponse<string> {
    let validation;
    if (exception.getResponse()) {
      validation = (exception.getResponse() as any).message;
    }
    return {
      result: null,
      errorCode: exception.getStatus(),
      errorMessage: 'Validation Error',
      validation,
    };
  }
  private createJsonFromExternalServicesException(
    exception: ExternalServicesException,
  ): BaseApiResponse<string> {
    let validation;

    return {
      result: null,
      errorCode: exception.getStatus(),
      errorMessage: exception.message,
      validation,
    };
  }
}
