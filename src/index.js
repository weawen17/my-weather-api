import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ReactDOM from 'react-dom/client';
import './index.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import QuerySuspense from './QuerySuspense';

const root = ReactDOM.createRoot(document.getElementById('root'));

const cli = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    }
  }
});

root.render(
  <Suspense fallback={<p>Loading...</p>}>
    <ErrorBoundary fallback={<div> 오류가 발생했습니다. </div>}>
      <QueryClientProvider client={cli}>
        <QuerySuspense />
      </QueryClientProvider>
    </ErrorBoundary>
  </Suspense>
);
