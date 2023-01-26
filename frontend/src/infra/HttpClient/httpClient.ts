// Fetch especifico para nossa aplicação
// Arquitetura hexagonal
// Ports & Adapters
export async function HttpClient(fetchUrl, fetchOptions) {
  return fetch(fetchUrl, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers
    },
    // Converte o que no body para string
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null
  })
    .then(async (response) => {
      return {
        ok: response.ok,
        body: await response.json()
      };
    });
}
