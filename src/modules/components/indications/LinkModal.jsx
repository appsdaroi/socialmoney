import { useState, useEffect } from "react";
import { Poppins } from "next/font/google";

import toast from "react-hot-toast";
import { Cross } from "react-swm-icon-pack";

import { AnimatePresence, motion } from "framer-motion";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { randomBetweenRange } from "@/helpers/random/randomBetweenRange";
import {
  Notify
} from "@/modules/components/notifications";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


const Modal = ({ state }) => {
  const MySwal = withReactContent(Swal);

  const { openModal, setOpenModal } = state;

  const [link, setLink] = useState("");
  const [bankNotification, setBankNotification] = useState(false);
  const [noOfNotifications, setNoOfNotifications] = useState(0);

  useEffect(() => {
    if (!link) setLink(generateLink());
  }, []);

  const generateLink = () => {
    // Aqui eu pego o user e gero um link com o id dele
    // Em seguida, salvo esse link no banco de dados
    return `${window.location.href}id-do-user`;
  };

  const handleCopyToClipboard = (evt) => {
    navigator.clipboard.writeText(link);
    evt.target.blur();

    toast.success("Seu link foi copiado!");
  };

  const handleShare = async () => {
    try {
      if (navigator.canShare)
        await navigator.share({
          text: "Ganhe dinheiro comigo utilizando o SocialMoney! Use meu link e ganhe R$100,00.",
          url: link,
        });
    } catch (error) {
      console.log("Sharing failed!", error);
    }
  };

  const handleMultipleShare = async () => {
    MySwal.fire({
      customClass: {
        container: poppins.className,
      },
      icon: "success",
      title: <span>Compartilhando...</span>,
      html: (
        <span className="text-sm leading-none">
          Seu link de indicação está sendo enviado para todos os seus contatos.
        </span>
      ),
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false,
      willClose: () => {
        setNoOfNotifications(randomBetweenRange(10, 18));
      },
    });

    setOpenModal(false);
  };

  useEffect(() => {
    if (noOfNotifications === 0) return;

    for (var i = 0; i < noOfNotifications; i++) {
      ((ind) => {
        const thisTimeoutTime = randomBetweenRange(1000, 3000);
        setTimeout(() => {
          setBankNotification(() => true);

          setTimeout(() => {
            setBankNotification(() => false);
          }, 1000 + thisTimeoutTime * ind)
        }, 2000 * ind);
      })(i);
    }

    setNoOfNotifications(0);
  }, [noOfNotifications]);

  return (
    <>
      <AnimatePresence>
        {bankNotification && <Notify value={10} setNotificationVisible={setBankNotification}/>}
          

        {openModal && (
          <>
            <motion.dialog
              key="linkModal"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              open
              className="fixed z-[999] bg-white rounded max-w-[95%] p-6 grid gap-4 h-auto shadow-lg"
            >
              <Cross
                set="curved"
                size="32"
                color="black"
                strokeWidth="1"
                className="ml-auto opacity-50"
                onClick={() => setOpenModal(false)}
              />

              <div className="grid gap-2 text-center">
                <h1 className="text-xl font-semibold">Aqui está seu link!</h1>
                <span className="max-w-xs px-8 text-sm font-semibold text-black/50">
                  Compartilhe com seus amigos e ganhe dinheiro juntos!
                </span>
              </div>
              <div className="grid gap-2">
                <input
                  type="text"
                  disabled={!link}
                  value={link || "Gerando..."}
                  className="w-full p-4 border rounded-lg bg-offwhite border-black/10"
                  onClick={(evt) => handleCopyToClipboard(evt)}
                />

                <button
                  className="w-full p-4 font-medium text-white border rounded-lg bg-primary-500"
                  onClick={() => handleShare()}
                >
                  Compartilhar
                </button>

                <button
                  className="w-full p-4 font-medium text-white border rounded-lg bg-primary-500"
                  onClick={() => handleMultipleShare()}
                >
                  Compartilhar em massa
                </button>
              </div>
            </motion.dialog>
            <motion.span
              key="backdropModal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-[998]"
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export { Modal };
