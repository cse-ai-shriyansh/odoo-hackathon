export async function apiFetch(url, options = {}, fallback = null) {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : undefined,
      "Content-Type": options.body ? "application/json" : undefined,
    };
    const res = await fetch(url, { ...options, headers });
    let data;
    try {
      data = await res.json();
    } catch (e) {
      data = null;
    }
    if (!res.ok) {
      const errorMsg = data?.error || data?.message || res.statusText;
      throw new Error(errorMsg);
    }
    return data;
  } catch (err) {
    if (fallback !== null) return fallback;
    throw err;
  }
}
