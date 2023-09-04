import BankCO from "./pages/bank/BankCO";
import BankTA from "./pages/bank/BankTA";
import MainTA from "./pages/main/MainTA";
import MainCO from "./pages/main/MainCO";
import LoginTA from "./pages/main/LoginTA";
import LoginCO from "./pages/main/LoginCO";

const Routes = [
  {
    path: "/main/mainta",
    component: MainTA,
  },
  {
    path: "/main/mainco",
    component: MainCO,
  },
  {
    path: "/main/talogin",
    component: LoginTA,
  },
  {
    path: "/main/cologin",
    component: LoginCO,
  },
  {
    path: "/bank/bankco",
    component: BankCO,
  },
  {
    path: '/bank/bankta',
    component: BankTA
  },
  {
    path: '/infoTA',
    component: InfoTA,
},
{
    path: '/infoCO',
    component: InfoCO
},
  {
    path: "/bank/bankta",
    component: BankTA,
  },
  {
    path: "/register/registerta",
    component: RegisterTA,
  },
  {
    path: "/register/registerco",
    component: RegisterTA,
  },
  {
    path: "/receipt/receiptta",
    component: ReceiptTA,
  },
  {
    path: "/receipt/receiptco",
    component: ReceiptCO,
  },
];


export default Routes;
