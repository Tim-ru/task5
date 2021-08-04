import * as yup from 'yup';

export default function validate(_schema = {}, _values = {}, visible = false, externalError = '', defautlInput = {}) {
  let result = { status: true, message: '', input: defautlInput };

  if (externalError) {
    result = {
      status: true,
      message: externalError,
      input: { status: 'danger', caption: externalError },
    };
    return result;
  }

  if (!visible) return result;

  let schema = yup.object().shape(_schema);
  result.status = schema.isValidSync(_values);
  try {
    schema.validateSync(_values);
  } catch (error) {
    result.message = error.errors[0];
    result.input.status = 'danger';
    result.input.caption = result.message;
  }
  return result;
}