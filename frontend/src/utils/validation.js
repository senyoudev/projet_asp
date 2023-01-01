export const isValidUsername = (username) => {
  // Minimum length of 8 characters
  if (username.length < 8) {
    return false;
  }

  // Must contain at least one letter and one number
  if (!/[a-zA-Z]/.test(username) || !/[0-9]/.test(username)) {
    return false;
  }

  return true;
}


export const isValidPassword = (password) => {
  // Minimum length of 8 characters
  if (password.length < 8) {
    return false;
  }

  // Must contain at least one uppercase letter, one lowercase letter, one number, and one special character
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[^a-zA-Z0-9]/.test(password)) {
    return false;
  }

  return true;
}

export const isValidEmail = (email) => {
  const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return pattern.test(email);
}