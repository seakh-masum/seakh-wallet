import { getColorOfTransactionType } from "@shared/utils";

const LedgerCard = ({ title, amount, date, transactionType, handleClick }) => {
  return (
    <div
      onClick={handleClick}
      className="flex flex-row items-center justify-between bg-white dark:bg-neutral-900 p-4 rounded-lg mb-3 h-20"
    >
      <div>
        <p className="mb-3 text-slate-700 dark:text-neutral-200">{title}</p>
        <p className={`text-xs text-neutral-500 block`}>{date}</p>
      </div>
      <div>
        <div className="flex flex-col gap-1 items-end text-right">
          <b className={`text-3xl ${getColorOfTransactionType(amount)}`}>
            {Math.abs(amount)}
          </b>
          <p className="text-sm dark:text-neutral-400">{transactionType}</p>
        </div>
      </div>
    </div>
  );
};

export default LedgerCard;
