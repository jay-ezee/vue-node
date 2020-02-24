import Vue from "vue";
import VueRouter from "vue-router";
import AddBlog from "../views/AddBlog.vue";
import AddEmployee from "../views/AddEmployee.vue";
import BlogDetail from "../views/BlogDetail.vue";
import EmpDetails from "../views/EmpDetails";
import LoginDetails from "../views/LoginDetails";
import Login from "../views/Login";
import Registration from "../views/Registration";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/registration",
    name: "registration",
    component: Registration
  },
  {
    path: "/addblog",
    name: "addblog",
    component: AddBlog
  },
  {
    path: "/blogdetail",
    name: "blogdetail",
    component: BlogDetail
  },
  {
    path: "/addemployee",
    name: "addemp",
    component: AddEmployee
  },
  {
    path: "/empdetails",
    name: "empdetails",
    component: EmpDetails
  },
  {
    path: "/logindetails",
    name: "logindetails",
    component: LoginDetails
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
