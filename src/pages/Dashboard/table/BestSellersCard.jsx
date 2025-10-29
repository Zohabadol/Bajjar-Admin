
import { FaShoppingBag, FaGlassWhiskey, FaMobileAlt, FaCoffee } from "react-icons/fa";

const bestSellers = [
  {
    name: "Luis Vuitton",
    mobail: "01763566765",
    amount: 14409,
    due: 1800,

  },
  {
    name: "Akij Beverage Akij Beverage",
    mobail: "01763566765",
    amount: 11396,
    due: 1300,

  },
  {
    name: "Mango Electronics",
    mobail: "01763566765",
    amount: 10243,
    due: 1100,
    
  },
  { name: "LadyInn", mobail: "01763566765", amount: 6636, due: 980,  },
];

const BestSellersCard = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md shadow-[#3326AE14] w-full ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Top 20 Unpaid Client</h2>
        {/* <button className="text-sm text-blue-500">More →</button> */}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-500 border-b border-gray-200">
              <th className="pb-2">Name</th>
              <th>Mobail</th>
              <th>Bill Amount</th>
              <th>Due Amount</th>
            </tr>
          </thead>
          <tbody>
            {bestSellers.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50 "
              >
                <td className="py-2 flex max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">

                  {item.name}
                </td>
                <td>{item.mobail}</td>
                <td>{item.amount}</td>
                <td>{item.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BestSellersCard;
