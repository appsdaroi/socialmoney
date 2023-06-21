import { CentsToReais } from "@/helpers/format/moneyFormat";

const RankListItem = ({ thisUserData }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <span className="w-[5%] text-sm text-slate-400">{thisUserData.pos}</span>

      <div className="flex items-center justify-around h-12 gap-3 pr-3 border rounded-lg bg-offwhite w-[95%]">
        <div
          className="h-full bg-center bg-cover rounded-l-lg aspect-square"
          style={{
            backgroundImage: `url(${thisUserData.photo})`,
          }}
        />
        <span className="text-sm font-medium truncate">
          {thisUserData.username}
        </span>
        <span className="flex-1 text-sm font-medium text-right whitespace-nowrap text-primary-500">
          {CentsToReais(thisUserData.balance)}
        </span>
      </div>
    </div>
  );
};

export { RankListItem };
