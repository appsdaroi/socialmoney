import { createContext, useState } from "react";

const moneyContext = createContext({
    money: 0,
    setMoney: (money) => {},
});

const MoneyContextProvider = ({ children }) => {
    const [money, setMoney] = useState(0);
    return (
        <moneyContext.Provider value={{ money, setMoney }}>
            {children}
        </moneyContext.Provider>
    );
};

export { moneyContext, MoneyContextProvider };
