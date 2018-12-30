import { AsyncActionCreators } from 'typescript-fsa'
import { Dispatch } from 'redux';

// https://github.com/aikoven/typescript-fsa/issues/5#issuecomment-255347353
function wrapAsyncWorker<TParameters, TSuccess, TError>(
  asyncAction: AsyncActionCreators<TParameters, TSuccess, TError>,
  worker: (params: TParameters) => Promise<TSuccess>,
) {
  return function wrappedWorker(dispatch, params: TParameters): Promise<TSuccess> {
    dispatch(asyncAction.started(params));
    return worker(params).then(result => {
      dispatch(asyncAction.done({ params, result }));
      return result;
    }, (error: TError) => {
      dispatch(asyncAction.failed({ params, error }));
      throw error;
    });
  }
}

export default wrapAsyncWorker;
