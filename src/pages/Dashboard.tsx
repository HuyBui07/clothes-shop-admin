import { useNavigate } from "react-router-dom";
import { useState } from "react";

// components
import Header from "../components/layouts/Header";
import InfoContainer from "../components/InfoContainer";
import StatusContainer from "../components/StatusContainer";
import Table from "../components/Table";

// icons
import Earning from "../assets/earning.svg?react";
import Order from "../assets/order.svg?react";
import Product from "../assets/product.svg?react";
import Customer from "../assets/customer.svg?react";

// Modal
import InfoOrder from "./order/OrderDetails";

// utils
import { formatPrice } from "../utills";

export default function Dashboard() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("");

  const [saleOrders, setSaleOrders] = useState([
    {
      id: "1",
      customerPhone: "0123456789",
      customerEmail: "john.doe@example.com",
      total: 100000,
      date: "2021-09-01",
      status: "pending",
    },
    {
      id: "2",
      customerPhone: "0123456789",
      customerEmail: "jane.doe@example.com",
      total: 200000,
      date: "2021-09-02",
      status: "completed",
    },
    {
      id: "3",
      customerPhone: "0123456789",
      customerEmail: "john.doe@example.com",
      total: 300000,
      date: "2021-09-03",
      status: "completed",
    },
    {
      id: "4",
      customerPhone: "0123456789",
      customerEmail: "jane.doe@example.com",
      total: 400000,
      date: "2021-09-04",
      status: "pending",
    },
    {
      id: "5",
      customerPhone: "0123456789",
      customerEmail: "john.doe@example.com",
      total: 500000,
      date: "2021-09-05",
      status: "completed",
    },
    {
      id: "6",
      customerPhone: "0123456789",
      customerEmail: "jane.doe@example.com",
      total: 600000,
      date: "2021-09-06",
      status: "pending",
    },
  ]);

  const productColumns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.1,
      headerClassName: "bg-gray-100",
    },
    {
      field: "customerPhone",
      headerName: "Customer's phone number",
      flex: 0.5,
      headerClassName: "bg-gray-100",
    },
    {
      field: "customerEmail",
      headerName: "Customer's email",
      headerClassName: "bg-gray-100",
      flex: 0.5,
    },
    {
      field: "total",
      headerName: "Total",
      flex: 0.4,
      headerClassName: "bg-gray-100",
      valueGetter: (params: any) => formatPrice(params),
    },
    {
      field: "date",
      headerName: "Date",
      headerClassName: "bg-gray-100",
      flex: 0.2,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.4,
      headerClassName: "bg-gray-100",
      renderCell: (params: any) => <StatusContainer status={params.value} />,
    },
  ];

  return (
    <>
      {isModalOpen && (
        <InfoOrder
          setIsModalOpen={setIsModalOpen}
          selectedOrderId={selectedOrderId}
        />
      )}
      <div className="flex flex-col h-full w-full overflow-y-auto">
        <Header />

        <div className="px-16 py-11 flex flex-col gap-5">
          <div className="flex gap-5">
            <InfoContainer title="Earning" info={1000} icon={<Earning />} />
            <InfoContainer title="Order" info={100} icon={<Order />} />
          </div>

          <div className="flex gap-5">
            <InfoContainer title="Product" info={50} icon={<Product />} />
            <InfoContainer title="Customer" info={10} icon={<Customer />} />
          </div>
        </div>

        <div className="flex flex-row justify-between items-center mt-4 px-16">
          <label>Newest Orders</label>
          <span
            onClick={() => navigate("/order")}
            className="text-base font-medium hover:cursor-pointer hover:underline"
          >
            View All {">>>"}
          </span>
        </div>

        <div className="mx-16">
          <Table
            columns={productColumns}
            rows={saleOrders}
            noCheckboxSelection
            setModalState={setIsModalOpen}
            setSelectedOrderId={setSelectedOrderId}
            cellName="id"
            identifyRoute="id"
            longNavigate
          />
        </div>
      </div>
    </>
  );
}
