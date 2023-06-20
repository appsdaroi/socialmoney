import { RankTopThree } from "./RankTopThree";
import { AnimatePresence, motion } from "framer-motion";
import { CentsToReais } from "@/helpers/format/moneyFormat";

const RankList = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: "100%", scaleX: 0.5 }}
      animate={{ opacity: 1, y: "0%", scaleX: 1 }}
      transition={{
        type: "tween",
        ease: "easeOut",
        duration: 0.4,
      }}
      className="flex flex-col mt-5"
    >
      <RankTopThree />

      <table className="mt-8" cellSpacing="0" cellPadding="0">
        <tbody className="flex flex-col gap-2">
          <tr className="border rounded-lg ml-5 bg-offwhite relative after:content-['4'] after:absolute after:-left-5 after:top-5 after:font-semibold after:opacity-25 after:text-xs">
            <td
              className="w-[20%] aspect-square bg-center bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  'url("https://randomuser.me/api/portraits/men/34.jpg")',
              }}
            ></td>
            <td className="overflow-hidden w-full max-w-[1px] whitespace-nowrap text-ellipsis p-4 text-sm opacity-50 font-medium">
              bonizeraaaaaaaaaaaaaaaaaaaa
            </td>
            <td className="p-4 text-sm font-medium whitespace-nowrap text-primary-500">
              {CentsToReais(867124723)}
            </td>
          </tr>

          <tr className="border rounded-lg ml-5 bg-offwhite relative after:content-['5'] after:absolute after:-left-5 after:top-5 after:font-semibold after:opacity-25 after:text-xs">
            <td
              className="w-[20%] aspect-square bg-center bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  'url("https://randomuser.me/api/portraits/men/34.jpg")',
              }}
            ></td>
            <td className="overflow-hidden w-full max-w-[1px] whitespace-nowrap text-ellipsis p-4 text-sm opacity-50 font-medium">
              bonizeraaaaaaaaaaaaaaaaaaaa
            </td>
            <td className="p-4 text-sm font-medium whitespace-nowrap text-primary-500">
              {CentsToReais(867124723)}
            </td>
          </tr>

          <tr className="border rounded-lg ml-5 bg-offwhite relative after:content-['6'] after:absolute after:-left-5 after:top-5 after:font-semibold after:opacity-25 after:text-xs">
            <td
              className="w-[20%] aspect-square bg-center bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  'url("https://randomuser.me/api/portraits/men/34.jpg")',
              }}
            ></td>
            <td className="overflow-hidden w-full max-w-[1px] whitespace-nowrap text-ellipsis p-4 text-sm opacity-50 font-medium">
              bonizeraaaaaaaaaaaaaaaaaaaa
            </td>
            <td className="p-4 text-sm font-medium whitespace-nowrap text-primary-500">
              {CentsToReais(867124723)}
            </td>
          </tr>

          <tr className="border rounded-lg ml-5 bg-offwhite relative after:content-['7'] after:absolute after:-left-5 after:top-5 after:font-semibold after:opacity-25 after:text-xs">
            <td
              className="w-[20%] aspect-square bg-center bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  'url("https://randomuser.me/api/portraits/men/34.jpg")',
              }}
            ></td>
            <td className="overflow-hidden w-full max-w-[1px] whitespace-nowrap text-ellipsis p-4 text-sm opacity-50 font-medium">
              bonizeraaaaaaaaaaaaaaaaaaaa
            </td>
            <td className="p-4 text-sm font-medium whitespace-nowrap text-primary-500">
              {CentsToReais(867124723)}
            </td>
          </tr>

          <tr className="border rounded-lg ml-5 bg-offwhite relative after:content-['8'] after:absolute after:-left-5 after:top-5 after:font-semibold after:opacity-25 after:text-xs">
            <td
              className="w-[20%] aspect-square bg-center bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  'url("https://randomuser.me/api/portraits/men/34.jpg")',
              }}
            ></td>
            <td className="overflow-hidden w-full max-w-[1px] whitespace-nowrap text-ellipsis p-4 text-sm opacity-50 font-medium">
              bonizeraaaaaaaaaaaaaaaaaaaa
            </td>
            <td className="p-4 text-sm font-medium whitespace-nowrap text-primary-500">
              {CentsToReais(867124723)}
            </td>
          </tr>

          <tr className="border rounded-lg ml-5 bg-offwhite relative after:content-['9'] after:absolute after:-left-5 after:top-5 after:font-semibold after:opacity-25 after:text-xs">
            <td
              className="w-[20%] aspect-square bg-center bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  'url("https://randomuser.me/api/portraits/men/34.jpg")',
              }}
            ></td>
            <td className="overflow-hidden w-full max-w-[1px] whitespace-nowrap text-ellipsis p-4 text-sm opacity-50 font-medium">
              bonizeraaaaaaaaaaaaaaaaaaaa
            </td>
            <td className="p-4 text-sm font-medium whitespace-nowrap text-primary-500">
              {CentsToReais(867124723)}
            </td>
          </tr>

          <tr className="border rounded-lg ml-5 bg-offwhite relative after:content-['10'] after:absolute after:-left-5 after:top-5 after:font-semibold after:opacity-25 after:text-xs">
            <td
              className="w-[20%] aspect-square bg-center bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  'url("https://randomuser.me/api/portraits/men/34.jpg")',
              }}
            ></td>
            <td className="overflow-hidden w-full max-w-[1px] whitespace-nowrap text-ellipsis p-4 text-sm opacity-50 font-medium">
              bonizeraaaaaaaaaaaaaaaaaaaa
            </td>
            <td className="p-4 text-sm font-medium whitespace-nowrap text-primary-500">
              {CentsToReais(867124723)}
            </td>
          </tr>
        </tbody>
      </table>
    </motion.div>
  );
};

export { RankList };
