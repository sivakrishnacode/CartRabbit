const routes = [
  {
    path: "/customer",
    name: "homeCustomer",
    component: () => import("../pages/customer/home.vue"),
  },
  {
    path: "/customer/login",
    name: "loginCustomer",
    component: () =>
      import("../pages/customer/loginRegister/isLoginOrRegister.vue"),
  },
  {
    path: "/customer/register",
    name: "registerCustomer",
    component: () =>
      import("../pages/customer/loginRegister/isLoginOrRegister.vue"),
  },

  // owner section

  {
    path: "/owner",
    name: "homeOwner",
    component: () => import("../pages/owner/home.vue"),
  },
  {
    path: "/owner/login",
    name: "loginOwner",
    component: () =>
      import("../pages/owner/loginRegister/isLoginOrRegister.vue"),
  },
  {
    path: "/owner/register",
    name: "registerOwner",
    component: () =>
      import("../pages/owner/loginRegister/isLoginOrRegister.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("components/ErrorNotFound.vue"),
  },
];

export default routes;
