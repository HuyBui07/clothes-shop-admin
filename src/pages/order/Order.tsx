import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//pages and components
import Table from "../../components/Table";
import StatusContainer from "../../components/StatusContainer";
import Header from "../../components/layouts/Header";
import InfoOrder from "./OrderDetails";

// utils
import { formatPrice } from "../../utills";

function SaleOrdersPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
    total: 0,
  });

  const handleSearch = async () => {};

  const statusOptions = ["PROCESSING", "DELIVERING", "COMPLETED", "CANCELLED"];

  //get all sale orders
  useEffect(() => {}, []);

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
        <div className="mt-12 mx-16">
          <Table
            className="table"
            columns={productColumns}
            rows={saleOrders}
            cellName="id"
            identifyRoute="id"
            setModalState={setIsModalOpen}
            setSelectedOrderId={setSelectedOrderId}
            noCheckboxSelection
            paginationModel={paginationModel}
            onPaginationModelChange={(paginationModel: any) =>
              setPaginationModel(paginationModel)
            }
          />
        </div>
      </div>
    </>
  );
}

export default SaleOrdersPage;
