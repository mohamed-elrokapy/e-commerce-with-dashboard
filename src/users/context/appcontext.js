import { createContext } from "react";
const appcontext = createContext({
  isloggedin: "",
  setisloggedin: () => {},
  logeduserinfo: {},
  setlogeduserinfo: () => {},
  products: [],
  addtocartcount: "",
  setaddtocartcount: () => {},
  shoppinglist: [],
  setshoppinglist: () => {},
  allusers: [],
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
