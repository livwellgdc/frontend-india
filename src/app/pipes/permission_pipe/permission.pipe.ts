import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'permission'
})
export class PermissionPipe implements PipeTransform {

  transform(value: any, permissonId, key  = 'view'): any {
    if (value  && value.length > 0) {
      if (value && value.length > 0) {
        for (let index = 0; index < value.length; index++) {
          if (permissonId == value[index].sectionId) {
            if (value[index][key]) {
              return true;
            } else {
              return false;
            }
          }
        }
        return false;

      } else {
        return false;
      }
    }
  }
}
