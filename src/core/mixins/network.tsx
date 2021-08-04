import Helpers from "@core/helpers";

interface ConfigInterface {
  request: object,
  response: Function | undefined
}

type Constructor = new (...args: any[]) => {};

function Network<TBase extends Constructor>(Base: TBase = Object) {
  return class extends Base {
    async request(config: ConfigInterface, body: any | undefined = {}) {
      const { request, response } = config;
      const result = await Helpers.request({ ...request, body: { ...request.body, ...body } }, response);
      return result
    }
  };
}

export default Network