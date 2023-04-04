import { useState, useContext } from "react"

import { formatMoney } from "@/helpers/format";
import { moneyContext } from "@/services/moneyContext";

import Image from "next/image";
import Link from "next/link";

import { Modal } from "@/modules/components/indications"

const Navbar = ({ userCurrMoney }) => {
  const { money, setMoney } = useContext(moneyContext);
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Modal state={{openModal, setOpenModal}}/>
    
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-[4.5rem] px-4 bg-offwhite border-b`}
      >
        <Link href="#">
          <Image src="/img/logo-dual.svg" width={32} height={32} />
        </Link>

        <div className="flex items-center">
          <button className="px-3 py-2 font-semibold text-primary-500" onClick={() => setOpenModal(true)}>
            GANHAR +
          </button>
          <Link
            className="px-4 py-2 font-semibold text-white rounded bg-primary-500"
            href="/wallet"
          >
            {formatMoney(money)}
          </Link>
        </div>
      </nav>
    </>
  );
};

export { Navbar };
