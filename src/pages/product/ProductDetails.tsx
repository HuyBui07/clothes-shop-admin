import { useState } from "react";

// commponents
import BackIcon from "../../assets/back.svg?react";

// icons
import { FaTimes } from "react-icons/fa";

type Size = {
  size: string;
  stock: number;
};

type Stock = {
  color: string;
  sizes: Size[];
};

export default function NewProduct(props: any) {
  // props
  const setIsModalOpen = props.setIsModalOpen;

  // Input actions
  const [productName, setProductName] = useState("");
  const [image, setImage] = useState<File>();
  const [price, setPrice] = useState(0);
  const [stocks, setStocks] = useState<Stock[]>();

  const handleEditProduct = () => {};
  const handleDeleteProduct = () => {};

  return (
    <div className="bg-gray-500 bg-opacity-30 flex flex-col justify-center items-center h-full w-full fixed top-0 left-0 z-10 ">
      <div className="flex flex-col w-2/3 bg-white p-5 border border-gray-500 rounded-xl overflow-y-auto my-5">
        <button
          className="flex justify-center items-center bg-white border border-black rounded-lg hover:bg-black hover:text-white mb-5 w-48"
          onClick={() => setIsModalOpen(false)}
        >
          <BackIcon />
          <span style={{ marginLeft: "1.25rem", fontSize: "1.125rem" }}>
            Add Product
          </span>
        </button>

        <h4 className="font-bold">Product name</h4>
        <input
          type="text"
          className="border border-gray-300 rounded-lg p-2 w-full"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <h4 className="font-bold mt-5 mb-2">Image</h4>
        {image && (
          <img
            src={URL.createObjectURL(image)}
            className="w-40 h-56 object-cover mt-2 mb-2 border border-gray-300"
          />
        )}
        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={(e) => {
            if (e.target.files) {
              setImage(e.target.files[0]);
            }
          }}
        />

        <h4 className="font-bold mt-5">Price</h4>
        <input
          type="number"
          className="border border-gray-300 rounded-lg p-2 w-full"
        />

        <h4 className="font-bold mt-5">Stocks</h4>
        {stocks?.map((stock, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-5 w-full mt-2 mb-2"
          >
            <div className="flex flex-row items-center justify-between w-full">
              <h3 className="font-bold">Variant {index + 1}</h3>
              <FaTimes
                className="ml-auto text-xl cursor-pointer"
                onClick={() => setStocks(stocks?.filter((_, i) => i !== index))}
              />
            </div>

            <h4 className="mt-2 font-bold">Color</h4>
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-2 w-1/4"
            />
            <h4 className="mt-2 font-bold">Sizes</h4>
            {stock.sizes.map((size, index) => (
              <>
                {" "}
                <div
                  key={index}
                  className="flex flex-row items-center mt-2 justify-between border border-gray-300 rounded-lg p-5 w-full "
                >
                  <div className="flex flex-row items-center w-5/6">
                    <h4 className="mr-2">Size</h4>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-lg p-2 w-full mr-8"
                    />
                    <p className="">-</p>
                    <h4 className="ml-8 mr-2">Stock</h4>
                    <input
                      type="number"
                      className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                  </div>
                  <FaTimes
                    className="ml-auto text-lg cursor-pointer"
                    onClick={() =>
                      setStocks((prevStocks) => {
                        const newStocks = [...(prevStocks || [])];
                        newStocks[index].sizes = newStocks[index].sizes.filter(
                          (_, i) => i !== index
                        );
                        return newStocks;
                      })
                    }
                  />
                </div>
              </>
            ))}
            <button
              className="border border-gray-300 rounded-lg p-2 w-60 mt-4"
              onClick={() => {
                setStocks((prevStocks = []) =>
                  prevStocks.map((prevStock, i) => {
                    if (i === index) {
                      return {
                        ...prevStock,
                        sizes: [...prevStock.sizes, { size: "", stock: 0 }],
                      };
                    }
                    return prevStock;
                  })
                );
              }}
            >
              Add size
            </button>
          </div>
        ))}

        <button
          className="border border-gray-300 rounded-lg p-2 w-60 mt-2"
          onClick={() =>
            setStocks((prevStocks) => [
              ...(prevStocks || []),
              { color: "", sizes: [{ size: "", stock: 0 }] },
            ])
          }
        >
          Add variant
        </button>

        <h4 className="font-bold mt-5">Description</h4>
        <textarea className="border border-gray-300 rounded-lg p-2 w-full min-h-52"></textarea>

        <h4 className="font-bold mt-5">Material</h4>
        <textarea className="border border-gray-300 rounded-lg p-2 w-full min-h-52"></textarea>

        <div className="flex flex-row mt-10">
          <button
            className="border border-black rounded-lg p-2 w-full mr-5"
            onClick={() => handleEditProduct()}
          >
            Edit Product
          </button>
          <button
            className="bg-red-500 text-white rounded-lg p-2 w-full "
            onClick={() => handleDeleteProduct()}
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
}
