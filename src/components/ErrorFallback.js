import React from 'react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button type="button" class="btn btn-danger" onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export default ErrorFallback;