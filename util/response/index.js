
export const successResponse = (
  res,
  statusCode,
  message,
  data,
//   pagination?: PaginatedData,
) => {
  res.status(statusCode).send({
    status: 'success',
    message,
    data,
  });
};

export const successLoginResponse = (
  res,
  statusCode,
  message,
  token,
  data,
) => {
  res.status(statusCode).send({
    status: 'success',
    message,
    token,
    data,
  });
};

export const errorResponse = (
  res,
  statusCode,
  error,
) => {
  res.status(statusCode).send({
    status: 'error',
    error,
  });
};
