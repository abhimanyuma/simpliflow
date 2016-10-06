function clean(str, character) {
    let clean_str = ""
    let broken = false;
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

export function reverse_string(str) {
    let reversed_string = "";
    for (let i = str.length - 1; i >= 0; i--) {
        reversed_string += str[i];
    }
    return reversed_string;
}

export function safe_join() {
    let arg_array = Array.from(arguments);
    let clean_args = arg_array.map(str => clean(str, "/"));
    return clean_args.join("/");
}