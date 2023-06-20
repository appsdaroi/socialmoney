import { CentsToReais } from "@/helpers/format/moneyFormat";

import Image from 'next/image'

const RankTopThree = () => {
  return (
    <div className="flex justify-center w-full gap-2 pb-4">
      <div className="flex flex-col items-center justify-center text-center scale-90 -mb-14 -mr-7">
        <Image src="/img/crown-bronze.svg" className="origin-bottom scale-90" width={50} height={50}/>

        <div className="mb-3 bg-white bg-center bg-cover border-4 rounded-full shadow-lg h-28 aspect-square border-primary-500" style={{ backgroundImage: 'url("https://randomuser.me/api/portraits/men/34.jpg")' }} />
        <span className="mr-1 text-xs">bonizera</span>
        <span className="mr-1 text-sm font-medium text-primary-500">
          {CentsToReais(238412780)}
        </span>
      </div>

      <div className="z-50 flex flex-col items-center justify-center text-center">
        <Image src="/img/crown-gold.svg" width={50} height={50}/>

        <div className="mb-3 bg-white bg-center bg-cover border-4 rounded-full shadow-lg h-28 aspect-square border-primary-500 shadow-primary-500/40"  style={{ backgroundImage: 'url("https://randomuser.me/api/portraits/men/34.jpg")' }}/>
        <span className="text-sm">bonizera</span>
        <span className="font-medium text-primary-500">
          {CentsToReais(238412780)}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center text-center scale-90 -mb-14 -ml-7">
        <Image src="/img/crown-silver.svg" className="origin-bottom scale-90" width={50} height={50}/>

        <div className="mb-3 bg-white bg-center bg-cover border-4 rounded-full shadow-lg h-28 aspect-square border-primary-500"  style={{ backgroundImage: 'url("https://randomuser.me/api/portraits/men/34.jpg")' }} />
        <span className="ml-1 text-xs">bonizera</span>
        <span className="ml-1 text-sm font-medium text-primary-500">
          {CentsToReais(238412780)}
        </span>
      </div>
    </div>
  );
};

export { RankTopThree };
