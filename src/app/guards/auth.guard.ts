import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let loggedUser = localStorage.getItem("loggedUser");
  if (!!loggedUser) {
    let loggedUserString = JSON.parse(loggedUser);
    if (loggedUserString && loggedUserString.name) {
        return true;
    } else {
      router.navigate(["login"]);
      return false;
    };
  } else {
    router.navigate(["login"]);
    return false;
  };
};
