export function errorMiddleware(err, _req, res, _next) {
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
}
