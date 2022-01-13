import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import * as Constants from '../helpers/constants'
import { LOCAL_STORAGE_KEYS } from '../helpers/Enums';

// sweet global way to handle 401s - works in tandem with existing AuthGuard route checks
// http://stackoverflow.com/questions/34934009/handling-401s-globally-with-angular-2

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router : Router, private service : AppService){ }

    intercept(
        req: HttpRequest<any>,
        next : HttpHandler
    ) : Observable<HttpEvent<any>> {

        try {
            if(localStorage.getItem('CMSTOKEN') !=null){
                const clonedReq = req.clone({
                    headers:req.headers.set(
                        "Authorization",
                        "Bearer "+localStorage.getItem('CMSTOKEN')
                    )
                });
                return next.handle(clonedReq).pipe(
                    tap(
                        succ => { },
                        err => {
                            if (err.status==401){
                                localStorage.removeItem('CMSTOKEN');
                                this.router.navigateByUrl("");
                            }else if (err.status==502){
                                //this.service.openSnackBar("The network error has occured. Please try again later.", "");
                            }
                            /**
                             * @author Kalam
                             * Immediately signing out the user If one user is active
                             */

                            if (err.error.Error !=undefined){
                                if(err.error.Error[0]==Constants.Messages.SESSIONEND) {
                                    this.service.endActiveSession();
                                }
                            }
                            
                        }
                    )
                );
            } else return next.handle(req.clone());
        } 
        catch (error) {
            throw new Error(
                "AuthInterceptor::intercept() Exception : "+ error
            );
            
        }

    }
    

   
}