import { createContext } from "react";
const appcontext = createContext({
  isloggedin: "",
  setisloggedin: () => {},
  logeduserinfo: {},
  setlogeduserinfo: () => {},
  products: [],
  setproducts: () => {},
  addtocartcount: "",
  setaddtocartcount: () => {},
  shoppinglist: [],
  setshoppinglist: () => {},
  allusers: [],
  fetchLoggedUser: () => {},
  targeteduser: {},
  settargeteduser: () => {},
  productsrequest: () => {},
  usersrequest: () => {},
  refresh: false,
  setrefresh: () => () => {},
  targetedproduct: null,
  settargetedproduct: () => {},
});
export default appcontext;
