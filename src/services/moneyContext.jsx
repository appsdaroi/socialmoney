import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import _ from "lodash";
import { FetchWithToken } from "@/utils/fetch";

const moneyContext = createContext({
  money: 0,
  setMoney: (money) => {},
});

const MoneyContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const [money, setMoney] = useState(0);

  const getBalance = async () => {
    const updateUserBalance = await FetchWithToken({
      path: `socialmoney/${session.session.user.id}`,
      method: "GET",
    });

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
