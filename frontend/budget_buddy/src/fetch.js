const API_BASE = "http://localhost:3000";

function buildAuthHeaders(token) {
  if (!token) {
    return {};
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}

export function login(email, password) {
  return fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log("Hiba:", err);
    });
}

export function register(name, email, password) {
  return fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log("Hiba:", err);
    });
}

export function getBalance(token) {
  return fetch(`${API_BASE}/transactions/balance`, {
    headers: buildAuthHeaders(token),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log("Hiba:", err);
    });
}

export function getSums(token) {
  return fetch(`${API_BASE}/transactions/sums`, {
    headers: buildAuthHeaders(token),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log("Hiba:", err);
    });
}


export function getTransactionList(token) {
  return fetch(`${API_BASE}/transactions/list`, {
    headers: buildAuthHeaders(token),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log("Hiba:", err);
    });
}

export function addTransaction(token, tipus, osszeg, kategoria, datum) {
  return fetch(`${API_BASE}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...buildAuthHeaders(token),
    },
    body: JSON.stringify({
      tipus: tipus,
      osszeg: osszeg,
      kategoria: kategoria,
      datum: datum,
    }),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log("Hiba:", err);
    });
}

export function getExpensesByCategory(token) {
  return fetch(`${API_BASE}/transactions/expenses-by-category`, {
    headers: buildAuthHeaders(token),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log("Hiba:", err);
    });
}

export function addGoal(token, name, target, current, deadline) {
  return fetch(`${API_BASE}/goals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...buildAuthHeaders(token),
    },
    body: JSON.stringify({
      nev: name,
      name: name,
      cel: target,
      osszeg_cel: target,
      aktualis: current,
      aktualis_osszeg: current,
      hatarido: deadline,
      datum: deadline,
    }),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log("Hiba:", err);
    });
}

export function getGoals(token) {
  return fetch(`${API_BASE}/goals`, {
    headers: buildAuthHeaders(token),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log("Hiba:", err);
    });
}

export function updateUser(token, name, email, password) {
  return fetch(`${API_BASE}/users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...buildAuthHeaders(token),
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log("Hiba:", err);
    });
}

export function deleteUser(token) {
  return fetch(`${API_BASE}/users`, {
    method: "DELETE",
    headers: buildAuthHeaders(token),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log("Hiba:", err);
    });
}
