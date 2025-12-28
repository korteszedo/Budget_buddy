export function login(email, password) {
  return fetch("http://localhost:3000/auth/login", {
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
  return fetch("http://localhost:3000/auth/register", {
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

export function getBalance(userId) {
  return fetch(`http://localhost:3000/transactions/balance/${userId}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log("Hiba:", err);
    });
}

export function getSums(userId) {
  return fetch(`http://localhost:3000/transactions/sums/${userId}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log("Hiba:", err);
    });
}


export function getTransactionList(userId) {
  return fetch(`http://localhost:3000/transactions/list/${userId}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log("Hiba:", err);
    });
}

export function getExpensesByCategory(userId) {
  return fetch(
    `http://localhost:3000/transactions/expenses-by-category/${userId}`
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log("Hiba:", err);
    });
}

export function getGoals(userId) {
  return fetch(`http://localhost:3000/goals/${userId}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log("Hiba:", err);
    });
}

export function updateUser(userId, name, email, password) {
  return fetch(`http://localhost:3000/users/${userId}`, {
    method: "PUT",
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

export function deleteUser(userId) {
  return fetch(`http://localhost:3000/users/${userId}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log("Hiba:", err);
    });
}
