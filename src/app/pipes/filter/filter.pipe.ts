import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: string): any {
    const resultPosts = [];
    if(value && arg.length > 2){
      for(let post of value){
        if(post.tags.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultPosts.push(post);
        }
      }
      return resultPosts;
    }
    
  }

}
