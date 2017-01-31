// @flow

function clean(str: string, character: string): string {
  let clean_str: string = ""
  let broken: boolean = false;
  for (let i = 0, counter=0; i < str.length; i++) {
    if((str[i] !== character) || broken) {
      clean_str += str[i];
      broken = true;
    }
  }
  str = reverse_string(clean_str);
  clean_str = ""
  broken = false
  for (let i = 0; i < str.length; i++) {
    if((str[i] !== character) || broken) {
      clean_str += str[i];
      broken = true;
    }
  }
  return reverse_string(clean_str);

}

export function reverse_string(str: string): string {
  let reversed_string: string = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed_string += str[i];
  }
  return reversed_string;
}

export function safe_join(...strs: string[]): string {
  let clean_args: string[] = strs.map(str => clean(str, "/"));
  return clean_args.join("/");
}

export function get_full_url(partial: string): string {
  let host: string = `api.${window.location.host}`;
  return `${window.location.protocol}//${safe_join(host, partial)}`;
}


export function generateUnsafeUniqueId(length: number):string {

  let result: string = ''
  let charMap = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';

  for (let i = 0; i < length; i++ ) {
    result += charMap[Math.floor(Math.random() * charMap.length)]
  }

  return result;
}

export function debounce(callback, wait, context = this) {
  let timeout = null
  let callbackArgs = null

  const later = () => callback.apply(context, callbackArgs)

  return function() {
    callbackArgs = arguments
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}