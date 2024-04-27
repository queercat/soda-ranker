type Soda = {
  name: string;
  rating: number;
};

fetch("http://localhost:3000/sodas", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Spaghetti Soda",
    rating: -100,
  } as Soda),
});

fetch("http://localhost:3000/sodas/Spaghetti Soda", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Yucky Soda",
    rating: -1000,
  } as Soda),
});
