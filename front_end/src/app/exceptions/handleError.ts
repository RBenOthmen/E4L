import { Forbidden } from './../exceptions/Forbidden';
import { BadInput } from '../exceptions/BadInput';
import { NotFoundError } from '../exceptions/not-found-error';
import { Unauthorized } from '../exceptions/Unauthorized';
import { AppError } from '../exceptions/AppError';
import { NoContent } from './../exceptions/NoContent';
import { throwError } from 'rxjs/internal/observable/throwError';


    export function handleError(err : Response) {
        console.log(err)
        if (err.status == 400) {
          return throwError (() => new BadInput(err));
        }
      
        if (err.status == 404) {
          return throwError (() => new NotFoundError(err));
        }
      
        if (err.status == 401) {
          return throwError (() => new Unauthorized(err));
        }
    
        // if (err.status == 204) {
        //   return throwError (() => new NoContent(err));
        // }
    
        if (err.status == 403) {
          return throwError (() => new Forbidden(err));
        }
      
        return throwError(() => new AppError(err));
      }
  