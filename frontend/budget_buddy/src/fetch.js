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
    .then((data) => {
      console.log("Valasz:", data);
      return data;
    })
    .catch((err) => {
      console.log("Hiba:", err);
    });
}

export function getBalance(userId) {
  return fetch(`http://localhost:3000/transactions/balance/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Valasz:", data);
      return data;
    })
    .catch((err) => {
      console.log("Hiba:", err);
    });
}

export function getSums(userId) {
  return fetch(`http://localhost:3000/transactions/sums/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Valasz:", data);
      return data;
    })
    .catch((err) => {
      console.log("Hiba:", err);
    });
}


export function getTransactionList(userId) {
  return fetch(`http://localhost:3000/transactions/list/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Valasz:", data);
      return data;
    })
    .catch((err) => {
      console.log("Hiba:", err);
    });
}

export function getExpensesByCategory(userId) {
  return fetch(
    `http://localhost:3000/transactions/expenses-by-category/${userId}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("Valasz:", data);
      return data;
    })
    .catch((err) => {
      console.log("Hiba:", err);
    });
}

export function getGoals(userId) {
  return fetch(`http://localhost:3000/goals/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Valasz:", data);
      return data;
    })
    .catch((err) => {
      console.log("Hiba:", err);
    });
}
