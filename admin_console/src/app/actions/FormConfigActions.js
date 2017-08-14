// @flow

const CREATE_FORM_CONFIG = 'FormConfig::Set';
export function setFormConfig(config: any, id: string, reset: boolean = true) {
  let response = {
    type: CREATE_FORM_CONFIG,
    data: config,
    reset: reset,
    id: id
  };
  return response
}
