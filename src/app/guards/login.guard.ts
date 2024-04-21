import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  let loggedUser = localStorage.getItem("loggedUser");
  if (!!loggedUser) {
    let loggedUserString = JSON.parse(loggedUser);
    if (loggedUserString && loggedUserString.name) {
        router.navigate(["home"]);
        return false;
    } else {
      return true;
    };
  } else {
    return true;
  };

};
