import BankCO from "./pages/bank/BankCO";
import BankTA from "./pages/bank/BankTA";
import MainTA from "./pages/main/MainTA";
import MainCO from "./pages/main/MainCO";
import LoginTA from "./pages/main/LoginTA";
import LoginCO from "./pages/main/LoginCO";
import HomeCO from "./pages/home/HomeCO";
import HomeTA from "./pages/home/HomeTA";
import DocrequestCO from "./pages/docrequest/DocrequestCO";
import DocrequestTA from "./pages/docrequest/DocrequestTA";
import RegisterTA from "./pages/register/RegisterTA";
import ReceiptCO from "./pages/receipt/ReceiptCO";
import ReceiptTA from "./pages/receipt/ReceiptTA";
import InfoTA from "./pages/info/InfoTA";
import InfoCO from "./pages/info/InfoCO";


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
    path: "/bank/bankta",
    component: BankTA,
  },
  {
    path: "/home/homeco",
    component: HomeCO,
  },
  {
    path: "/home/hometa",
    component: HomeTA,
  },
  {
    path: "/docrequest/docrequestco",
    component: DocrequestCO,
  },
  {
    path: "/docrequest/docrequestta",
    component: DocrequestTA,
  },
  {
    path: '/info/infota',
    component: InfoTA,
  },
  {
    path: '/info/infoco',
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
