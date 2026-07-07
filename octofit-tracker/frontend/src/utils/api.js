export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (typeof codespaceName === 'string' && codespaceName.trim()) {
    return `https://${codespaceName.trim()}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export function getApiEndpoint(resource) {
  const baseUrl = getApiBaseUrl();
  const safeResource = resource ? resource.toLowerCase() : '';

  if (!safeResource) {
    return `${baseUrl}/api/`;
  }

  return `${baseUrl}/api/${safeResource}/`;
}
