export function responseSuccess(code, result) {
  return {
    code,
    result,
  };
}

export function responseError(code, message) {
  return {
    code,
    result: {
      message,
    },
  };
}
