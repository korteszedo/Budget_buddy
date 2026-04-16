const API_BASE = "http://localhost:3000";

// auth fejlec
function buildAuthHeaders(token) {
  if (!token) {
    return {};
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}

// login keres
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

// register keres
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

// egyenleg keres
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

// osszegzes keres
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


// lista keres
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

// tranzakcio mentes
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

// kiadasok keres
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

// cel mentes
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

// cel lista
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

// cel frissites
export function updateGoal(token, goalId, current) {
  return fetch(`${API_BASE}/goals/${goalId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...buildAuthHeaders(token),
    },
    body: JSON.stringify({
      aktualis_osszeg: current,
      aktualis: current,
    }),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log("Hiba:", err);
    });
}

// cel torles
export function deleteGoal(token, goalId) {
  return fetch(`${API_BASE}/goals/${goalId}`, {
    method: "DELETE",
    headers: buildAuthHeaders(token),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log("Hiba:", err);
    });
}

// user lista
export function getUsers(token) {
  return fetch(`${API_BASE}/users`, {
    headers: buildAuthHeaders(token),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log("Hiba:", err);
    });
}

// user mentes
export function editUser(token, userId, name, email) {
  return fetch(`${API_BASE}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...buildAuthHeaders(token),
    },
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log("Hiba:", err);
    });
}

// profil mentes
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

// user torles
export function deleteUser(token, userId) {
  const hasId = typeof userId === "number" || typeof userId === "string";
  const url = hasId ? `${API_BASE}/users/${userId}` : `${API_BASE}/users`;
  return fetch(url, {
    method: "DELETE",
    headers: buildAuthHeaders(token),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log("Hiba:", err);
    });
}
