import { 
  ExceptionFilter, 
  Catch, 
  ArgumentsHost, 
  HttpException,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 500;
    let message = 'Internal server error';
    let error = 'Internal Server Error';

    if (exception instanceof UnauthorizedException) {
      status = 401;
      message = exception.message || 'Token tidak ditemukan';
      error = 'Unauthorized';
    } else if (exception instanceof NotFoundException) {
      status = 404;
      message = exception.message || 'Data tidak ditemukan';
      error = 'Not Found';
    } else if (exception instanceof ConflictException) {
      status = 409;
      message = exception.message || 'Konflik data';
      error = 'Conflict';
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      error = exception.name.replace('Exception', '');
    }

    response.status(status).json({
      message,
      error,
      statusCode: status
    });
  }
}