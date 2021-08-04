const { floor, random } = Math;

export function randomKey(count) {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < count; i++) {
    text += possible.charAt(floor(random() * possible.length));
  }

  return text;
}

export default randomKey;
