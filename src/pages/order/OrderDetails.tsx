import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//pages and components
import InformationLine from "../../components/InformationLine";
import Table from "../../components/Table";

// icons
import BackIcon from "../../assets/back.svg?react";
import Header from "../../components/layouts/Header";

const InfoOrder = (props: any) => {
  const { id } = useParams();
  const [orderId, setOrderId] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState("");
  const [discount, setDiscount] = useState(0);

  const setIsModalOpen = props.setIsModalOpen;
  const selectedOrderId = props.selectedOrderId

  interface Product {
    name: string;
    unitPrice: number;
    amount: number;
    total: number;
    imageUrl: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [orderStatus, setOrderStatus] = useState("PROCESSING");

  const [loading, setLoading] = useState(true);

  const handleChangeStatus = async (newStatus: string) => {
    // TODO
  };

  //get order information
  useEffect(() => {
    //TODO: set prop information
  }, []);

  const productColumns = [
    {
      headerName: "Product name",
      field: "name",
      flex: 0.7,
      renderCell: (params: any) => (
        <div className="productNameCell">
          <img className="productImage" src={params.row.imageUrl} />
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      headerName: "Price/Unit",
      field: "unitPrice",
      flex: 0.4,
      valueGetter: (params: any) => params.value.toFixed(2) + " $",
    },
    { headerName: "Amount", field: "amount", flex: 0.4 },
    {
      headerName: "Total",
      field: "total",
      flex: 0.4,
      valueGetter: (params: any) => params.value.toFixed(2) + " $",
    },
  ];

  return (
    <div className="bg-gray-500 bg-opacity-30 flex flex-col justify-center items-center h-full w-full fixed top-0 left-0 z-10 ">
      <div className="flex flex-col w-2/3 bg-white p-5 border border-gray-500 rounded-xl overflow-y-auto my-5">
        <button
          className="flex bg-white border border-black rounded-lg hover:bg-black hover:text-white mb-5 w-60"
          onClick={() => setIsModalOpen(false)}
        >
          <BackIcon />
          <span style={{ marginLeft: "1.25rem", fontSize: "1.125rem" }}>
            Order Information
          </span>
        </button>

        <InformationLine label="Order ID:" content={orderId} />
        <InformationLine
          label="Customer's phone number:"
          content={customerPhone}
        />
        <InformationLine label="Customer's name:" content={customerName} />
        <InformationLine label="Date:" content={date} />
        <label>List of products:</label>
        <Table columns={productColumns} rows={products} noCheckboxSelection />

        <InformationLine label="Discounts:" content={discount + "%"} />
        <InformationLine
          label="Total:"
          content={<span style={{ color: "red" }}>{total.toFixed(2)} $</span>}
        />
        

        <div className="flex flex-row w-2/5 items-center justify-between">
          <label>Order status:</label>
          <select
            className={
              "rounded-2xl px-5 py-1 font-medium w-2/3 text-center text-sm " +
              (orderStatus === "PROCESSING"
                ? "bg-yellow-200 text-yellow-800"
                : orderStatus === "DELIVERING"
                ? "bg-blue-200 text-blue-800"
                : orderStatus === "COMPLETED"
                ? "bg-green-200 text-green-800"
                : orderStatus === "CANCELLED"
                ? "bg-red-200 text-red-800"
                : "")
            }
            value={orderStatus}
            onChange={(event) => {
              const newStatus = event.target.value;
              if (
                window.confirm(
                  "Are you sure to change the status to " + newStatus + "?"
                ) === false
              )
                return;

              setOrderStatus(newStatus);
            }}
            disabled={
              orderStatus === "CANCELLED" || orderStatus === "COMPLETED"
            }
          >
            <option
              value="PROCESSING"
              className="bg-yellow-200 text-yellow-800"
            >
              Processing
            </option>
            <option value="DELIVERING" className="bg-blue-200 text-blue-800">
              Delivering
            </option>
            <option value="COMPLETED" className="bg-green-200 text-green-800">
              Completed
            </option>
            {orderStatus === "CANCELLED" ? (
              <option value="CANCELLED" className="bg-red-200 text-red-800 " disabled>
                Cancelled
              </option>
            ) : null}

            {/* Add more options for other statuses if necessary */}
          </select>
        </div>

        {orderStatus !== "CANCELLED" && orderStatus !== "COMPLETED" ? (
          <button
            className="bg-red-500 text-white rounded-lg px-5 py-2 w-1/3 mx-auto mt-5"
            onClick={async () => {
              if (
                window.confirm("Are you sure to cancel this order?") === false
              )
                return;
              setLoading(true);
              handleChangeStatus("CANCELLED");
              setOrderStatus("CANCELLED");
              setLoading(false);
            }}
          >
            Cancel this order
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default InfoOrder;
