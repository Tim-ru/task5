export function fetch_({ url, method, headers, body, ignoreDisablePreloader }, setPreloader) {
  if (typeof setPreloader !== 'function') {
    if (setPreloader !== false) {
      console.warn(
        'You did not pass setPreloader - the request is running in the background. Pass false to hide this notification or setPreloader function from redux',
      );
    }
    setPreloader = () => { };
  }

  return new Promise((resolve) => {
    setPreloader(true);
    fetch(url, {
      method: method || 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      ...(method.toUpperCase() === 'POST' ? { body: JSON.stringify(body) } : {}),
    })
      .then((res) => res.json())
      .then(res => {
        !ignoreDisablePreloader && setPreloader(false)
        resolve(res)
      })
      .catch((err) => {
        !ignoreDisablePreloader && setPreloader(false)
        resolve({ status: false, data: { message: 'Server error' } });
        return err;
      })
  });
}

export default fetch_;
