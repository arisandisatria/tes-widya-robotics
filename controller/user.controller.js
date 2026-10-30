export const getHome = (req, res) => {
  res.render("pages/home", {
    title: "Home",
  });
};

export const getLogin = (req, res) => {
  res.render("pages/login", {
    title: "Login",
  });
};

export const getRegister = (req, res) => {
  res.render("pages/register", {
    title: "Register",
  });
};
export const getProfile = (req, res) => {
  res.render("pages/profile", {
    title: "Profile",
  });
};
