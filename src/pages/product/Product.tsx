import { useState } from "react";

// components
import Header from "../../components/layouts/Header";
import Table from "../../components/Table";

// components
import NewProduct from "./NewProduct";
import ProductDetails from "./ProductDetails";

// utils
import { formatPrice } from "../../utills";

// icons
import DeleteIcon from "../../assets/delete.svg?react";
import AddIcon from "../../assets/add.svg?react";

export default function Product() {
  // Delete actions
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const handleDelete = (selectedRowIds: string[]) => {
    setSelectedRowIds(selectedRowIds);
  };

  // Product details actions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");

  // New product actions
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  // Table actions
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
    total: 0,
  });

  const productRows = [
    {
      id: "1",
      productName: "Product 1",
      price: 100000,
      stocks: 10,
    },
    {
      id: "2",
      productName: "Product 2",
      price: 200000,
      stocks: 20,
    },
    {
      id: "3",
      productName: "Product 3",
      price: 300000,
      stocks: 30,
    },
    {
      id: "4",
      productName: "Product 4",
      price: 400000,
      stocks: 40,
    },
  ];

  const productColumns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.05,
      headerClassName: "bg-gray-100",
    },
    {
      field: "productName",
      headerName: "Product name",
      flex: 0.5,
      headerClassName: "bg-gray-100",
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.4,
      headerClassName: "bg-gray-100",
      valueGetter: (params: any) => formatPrice(params),
    },
    {
      field: "stocks",
      headerName: "Stocks",
      headerClassName: "bg-gray-100",
      flex: 0.2,
    },
  ];

  return (
    <>
      {isAddProductModalOpen  && (
        <NewProduct setIsModalOpen={setIsAddProductModalOpen} />
      )}
      {isModalOpen && (
        <ProductDetails
          setIsModalOpen={setIsModalOpen}
          selectedProductId={selectedProductId}
        />
      )}

      <div className="flex flex-col h-full w-full">
        <Header />

        <div className="flex flex-col w-full gap-5 px-16 py-11">
          <div className="flex flex-row ml-auto h-14 gap-5">
            <button className="" onClick={() => handleDelete(selectedRowIds)}>
              <DeleteIcon />
            </button>
            <button
              onClick={() => setIsAddProductModalOpen(true)}
              className="flex flex-row items-center gap-2 bg-black text-white max-w-fit font-semibold px-4 py-2 rounded-lg"
            >
              <AddIcon /> New product
            </button>
          </div>

          <div className="">
            <Table
              className="table"
              columns={productColumns}
              rows={productRows}
              cellName="id"
              identifyRoute="id"
              setModalState={setIsModalOpen}
              setSelectedProductId={setSelectedProductId}
              paginationModel={paginationModel}
              onPaginationModelChange={(paginationModel: any) =>
                setPaginationModel(paginationModel)
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
