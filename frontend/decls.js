declare type EmptyObject = {}

declare type valueType = string | number | boolean | null;
declare type basicType = string | number | boolean | null | void;
declare type JSONType = string | number | boolean | null | JSONObjectType | JSONArrayType;
declare type JSONObjectType = { [key:string]: JSONType };
declare type JSONArrayType = Array<JSONType>;

// Types of Objects


declare type UserProfileType = Map<string, JSONType>;
declare type ErrorListType = {[id:string]: Array< string >} | null;
