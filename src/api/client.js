const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

async function request(path, options = {}) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 15000)

  let response
  const token = localStorage.getItem('talentlink_token')
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
      ...options,
      signal: controller.signal,
    })
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('The server did not respond in time. Make sure the backend is running.')
    }
    throw new Error('Unable to connect to the backend. Make sure it is running on port 8000.')
  } finally {
    clearTimeout(timeoutId)
  }

  if (!response.ok) {
    const errorText = await response.text()
    let message = errorText || `Request failed: ${response.status}`
    try {
      const errorBody = JSON.parse(errorText)
      message = errorBody.detail || errorBody.message || message
    } catch {
      // Keep non-JSON server errors readable.
    }
    if (response.status === 401) {
      localStorage.removeItem('talentlink_token')
      localStorage.removeItem('talentlink_user_role')
      localStorage.removeItem('talentlink_user_id')
      if (window.location.pathname !== '/login') window.location.assign('/login')
    }
    throw new Error(message)
  }

  return response.status === 204 ? null : response.json()
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
}

export default api
