import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import _ from "lodash";
import axios from "axios";

const moneyContext = createContext({
  money: 0,
  setMoney: (money) => {},
});

const MoneyContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const [money, setMoney] = useState(0);

  const getBalance = async () => {
    const updateUserBalance = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/socialmoney/${session.session.user.id}`
    );

    if (updateUserBalance.data.status !== 200)
      return setMoney(session.session.user.balance);

    setMoney(updateUserBalance.data.response.user.balance);
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <moneyContext.Provider value={{ money, setMoney }}>
      {children}
    </moneyContext.Provider>
  );
};

export { moneyContext, MoneyContextProvider };
