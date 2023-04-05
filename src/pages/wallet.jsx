import { useEffect, useState, useRef, useContext } from "react";
import { Poppins } from "next/font/google";
import { getSession } from "next-auth/react";

import _ from "lodash";
import axios from "axios";

import { toDollars, toCents } from "@/helpers/format";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import * as yup from "yup";
import { cpf, cnpj } from "cpf-cnpj-validator";
import validator from "validator";

import toast from "react-hot-toast";

import { Modal } from "@/modules/components/indications";
import { Notify } from "@/modules/components/notifications";
import { User1, Smartphone, Mail, Refresh } from "react-swm-icon-pack";

import { AnimatePresence, motion } from "framer-motion";

import { randomBetweenRange } from "@/helpers/random/randomBetweenRange";
import { moneyContext } from "@/services/moneyContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Wallet({ session }) {
  const { money, setMoney } = useContext(moneyContext);

  const [openModal, setOpenModal] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [bankNotification, setBankNotification] = useState(false);
  const [activeType, setActiveType] = useState("cpf");

  const [withdrawValues, setWithdrawValues] = useState({
    type: "cpf",
    pix: {
      value: "",
      hasErrors: false,
    },
    money: {
      value: "",
      hasErrors: false,
    },
  });

  const pixRef = useRef(null);
  const moneyRef = useRef(null);

  const MySwal = withReactContent(Swal);

  const pixTypeValidations = {
    cpf: yup
      .string("CPF inválido")
      .required()
      .test((value) =>
        value.length > 11 ? cnpj.isValid(value) : cpf.isValid(value)
      ),
    phone: yup
      .string("Telefone inválido")
      .required()
      .test((value) => validator.isMobilePhone(value)),
    mail: yup.string("E-mail inválido").required().email(),
    random: yup.string().required(),
  };

  const widthdrawSchema = yup.object().shape({
    pix: pixTypeValidations[activeType],
    money: yup.number().required().positive().integer(),
  });

  const handleWithdraw = () => {
    setClicked(true);

    const pixInfo = pixRef.current;
    const moneyInfo = moneyRef.current;

    const checkWithdrawData = {
      pix: pixInfo.value,
      money: parseInt(moneyInfo.value),
    };

    widthdrawSchema
      .validate(checkWithdrawData, { abortEarly: false })
      .then((valid) => {
        if (!valid) return toast.error("Preencha os campos corretamente!");

        setWithdrawValues(
          {
            ...withdrawValues,
            pix: {
              value: parseInt(pixInfo.value),
              hasErrors: false,
            },
            money: {
              value: parseInt(moneyInfo.value),
              hasErrors: false,
            },
          },
          checkValidWithdraw()
        );
      })
      .catch((err) => {
        console.log(err);

        if (err.toString().includes("errors")) {
          setWithdrawValues({
            ...withdrawValues,
            pix: {
              ...withdrawValues.pix,
              hasErrors: true,
            },
            money: {
              ...withdrawValues.money,
              hasErrors: true,
            },
          });

          toast.error("Preencha os campos corretamente!");
          return;
        }

        if (err.toString().includes("pix")) {
          setWithdrawValues({
            ...withdrawValues,
            pix: {
              ...withdrawValues.pix,
              hasErrors: true,
            },
          });

          toast.error("PIX inválido!");
          return;
        }

        setWithdrawValues({
          ...withdrawValues,
          money: {
            ...withdrawValues.money,
            hasErrors: true,
          },
        });

        toast.error("Valor a ser retirado é inválido!");
        // this.showToast('top-right', 'danger', JSON.stringify(err.errors))
      });
  };

  const checkValidWithdraw = () => {
    if (withdrawValues.pix.hasErrors || withdrawValues.money.hasErrors) return;

    if (
      parseInt(moneyRef.current.value) == 0 ||
      moneyRef.current.value == undefined
    )
      return toast.error("Valor a ser retirado é inválido!");

    if (parseInt(moneyRef.current.value) > money) {
      toast.error("Saldo insuficiente!");

      setWithdrawValues({
        ...withdrawValues,
        money: {
          ...withdrawValues.money,
          hasErrors: true,
        },
      });

      return;
    }

    setMoney(money - toCents(moneyRef.current.value));
  };

  const checkNumberInput = (e) => {
    if (isNaN(e.key) && ![8, 46].includes(e.keyCode)) return e.preventDefault();

    return true;
  };

  const updateDb = async (value) => {
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
      (user) => user.id === session.user.id
    );

    currentUser.balance = currentUser.balance - toCents(value);

    const thisUserIndex = _.findIndex(
      currentData.users,
      (user) => user.id === session.user.id
    );

    currentData.users.splice(thisUserIndex, 1, currentUser);

    await axios({
      method: "put",
      url: "https://api.jsonbin.io/v3/b/642c83b9ace6f33a2204b399",
      headers: {
        "X-Master-Key":
          "$2b$10$qo5bE7wh/z3fVPs.xyH6W.jly4sXaI7d3T3LoiqfYl8Rkw0U1JThi",
      },
      data: currentData,
    });

    MySwal.fire({
      customClass: {
        container: poppins.className,
      },
      icon: "success",
      title: <span>Saque realizado!</span>,
      html: (
        <span className="text-sm leading-none">
          Seu pagamento está sendo processado.
          <br /> O valor estará na sua conta em breve.
        </span>
      ),
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      willClose: () => {
        setTimeout(() => {
          setBankNotification(true);
        }, randomBetweenRange(0, 5000));
      },
    });
  };

  useEffect(() => {
    pixRef.current.value = "";
  }, [activeType]);

  useEffect(() => {
    clicked && updateDb(withdrawValues.money.value);
  }, [withdrawValues]);

  return (
    <>
      <Modal state={{ openModal, setOpenModal }} />
      <AnimatePresence>
        {bankNotification && (
          <Notify
            value={withdrawValues.money.value}
            bank={session.user.bank}
            setNotificationVisible={setBankNotification}
          />
        )}
      </AnimatePresence>

      <motion.div
        key="walletPage"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        exit={{ x: 100 }}
        className="py-4"
      >
        <div className="grid gap-2 px-4">
          <button
            className="w-full px-10 py-5 font-medium text-white border rounded-lg bg-primary-500"
            onClick={() => setOpenModal(true)}
          >
            <h1 className="text-xl font-semibold text-center">
              Ganhe dinheiro indicando amigos!
            </h1>
            <span className="inline-block text-sm font-semibold text-center text-white/50">
              A cada indicação, você <br />
              ganha R$10,00!
            </span>
          </button>

          <div className="w-full px-10 py-5 font-medium text-center border rounded-lg bg-offwhite">
            <h2 className="mb-2 text-sm">Seu saldo</h2>
            <div className="text-primary-500">
              <span className="text-sm">R$</span>
              <span className="text-5xl font-semibold">
                {toDollars(money).slice(3)}
              </span>
            </div>
          </div>

          <h6 className="mt-4 mb-2 text-sm font-semibold text-center">
            Selecione seu tipo de chave pix
          </h6>

          <div className="flex flex-col gap-2">
            <div className="grid grid-flow-col grid-cols-4 gap-2">
              <button
                onClick={() => setActiveType("cpf")}
                className={`transition-colors flex flex-col items-center justify-center flex-1 gap-2 px-1 py-3 font-medium  border rounded-lg ${
                  activeType === "cpf"
                    ? "bg-primary-500 text-white"
                    : "bg-offwhite"
                }`}
              >
                <User1
                  set="curved"
                  size="24"
                  strokeWidth="1.5"
                  color={activeType === "cpf" ? "white" : "black"}
                />

                <span className="text-sm">
                  CPF/
                  <br />
                  CPNJ
                </span>
              </button>

              <button
                onClick={() => setActiveType("phone")}
                className={`transition-colors flex flex-col items-center justify-center flex-1 gap-2 px-1 py-3 font-medium  border rounded-lg ${
                  activeType === "phone"
                    ? "bg-primary-500 text-white"
                    : "bg-offwhite"
                }`}
              >
                <Smartphone
                  set="curved"
                  size="24"
                  strokeWidth="1.5"
                  color={activeType === "phone" ? "white" : "black"}
                />

                <span className="text-sm">Celular</span>
              </button>

              <button
                onClick={() => setActiveType("mail")}
                className={`transition-colors flex flex-col items-center justify-center flex-1 gap-2 px-1 py-3 font-medium  border rounded-lg ${
                  activeType === "mail"
                    ? "bg-primary-500 text-white"
                    : "bg-offwhite"
                }`}
              >
                <Mail
                  set="curved"
                  size="24"
                  strokeWidth="1.5"
                  color={activeType === "mail" ? "white" : "black"}
                />

                <span className="text-sm">E-mail</span>
              </button>

              <button
                onClick={() => setActiveType("random")}
                className={`transition-colors flex flex-col items-center justify-center flex-1 gap-2 px-1 py-3 font-medium  border rounded-lg ${
                  activeType === "random"
                    ? "bg-primary-500 text-white"
                    : "bg-offwhite"
                }`}
              >
                <Refresh
                  set="curved"
                  size="24"
                  strokeWidth="1.5"
                  color={activeType === "random" ? "white" : "black"}
                />

                <span className="text-sm">Aleatória</span>
              </button>
            </div>

            <input
              ref={pixRef}
              type="text"
              placeholder="Digite sua chave PIX..."
              className={`w-full p-4 border rounded-lg bg-offwhite border-black/10 ${
                withdrawValues.pix.hasErrors && "!border-red-500"
              }`}
            />

            <div className="relative after:content-['R$'] after:absolute after:left-4 after:font-bold after:top-1/2 after:-translate-y-1/2 after:pointer-events-none">
              <input
                ref={moneyRef}
                type="number"
                onKeyDown={(e) => checkNumberInput(e)}
                placeholder="Digite o valor..."
                className={`relative w-full p-4 pl-12 border rounded-lg bg-offwhite border-black/10 ${
                  withdrawValues.money.hasErrors && "!border-red-500"
                }`}
              />
            </div>

            <button
              onClick={() => handleWithdraw()}
              className="flex flex-col items-center justify-center flex-1 gap-2 p-3 font-medium text-white border rounded-lg bg-primary-500"
            >
              Sacar
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session)
    return {
      redirect: { destination: "/auth/signin" },
    };

  return {
    props: {
      session: session,
    },
  };
}
