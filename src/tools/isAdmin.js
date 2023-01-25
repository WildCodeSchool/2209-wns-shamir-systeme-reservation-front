import jwtDecode from "jwt-decode";

const isAdmin = (token) => {
  try {
    // Decode the token
    const decoded = jwtDecode(token);

    // Check if the token is valid
    if (decoded) {
        console.log(decoded.role[0].name);
      return (decoded.role[0].name === "ADMIN");
    }
  } catch (err) {
    // Return null if the token is invalid
    console.log("Erreur :", err);
    return false;
  }
};

export default isAdmin;