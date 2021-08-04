import Model from '@core/components/abstract/model';
import { BASEURL, PORT } from '@core/generated/config';
import Helpers from '@core/helpers';

export class TaskModel extends Model {
  get config() {
    return ({
      load: { request: { url: `${BASEURL}:${PORT}/issues/get`, body: { issue: String(this.id) } } },
      save: { request: { url: `${BASEURL}:${PORT}/issues/update`, body: { issue: String(this.id) } } },
      delete: { request: { url: `${BASEURL}:${PORT}/issues/delete` } },
    })
  }
}
export default TaskModel;