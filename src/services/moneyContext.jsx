import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import _ from "lodash";
import axios from "axios";

const moneyContext = createContext({
  money: 0,
  setMoney: (money) => {},
});

const MoneyContextProvider = ({ children }) => {
  const { data: session } = useSession()
  const [money, setMoney] = useState(0);

  const getBalance = async () => {
    const config = {
      headers: {
        "X-Master-Key":
          "$2b$10$qo5bE7wh/z3fVPs.xyH6W.jly4sXaI7d3T3LoiqfYl8Rkw0U1JThi",
      },
    };

    const db = await axios.get(
      "https://api.jsonbin.io/v3/b/642c83b9ace6f33a2204b399",
      config
    );

    const currentData = db.data.record;

    const currentUser = _.find(
      currentData.users,
      (user) =>
        user.id === session.user.id
    );

    setMoney(currentUser.balance);
  }

  useEffect(() => {
    getBalance()
  }, [])
  

  return (
    <moneyContext.Provider value={{ money, setMoney }}>
      {children}
    </moneyContext.Provider>
  );
};

export { moneyContext, MoneyContextProvider };
