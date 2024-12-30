import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";

function Table(props: any) {
  const navigate = useNavigate();
  const location = useLocation();

  const cellName = props.cellName;
  const longNavigate = props.longNavigate;
  const noCheckboxSelection = props.noCheckboxSelection;
  const disableRowSelectionOnClick = props.disableRowSelectionOnClick || false;
  const identifyRoute = props.identifyRoute;
  const setModalOpen = props.setModalState;
  const setSelectedOrderId = props.setSelectedOrderId;

  const handlePaginationChange = (params: any) => {
    if (props.paginationModel.page !== params.page) {
      props.onPaginationModelChange({
        ...props.paginationModel,
        page: params.page,
      });
    }
  };

  const handleCellClick = props.handleCellClick
    ? props.handleCellClick
    : (params: any, event: React.MouseEvent) => {
        if (params.field === identifyRoute) {
          event.stopPropagation();
        }
        if (setModalOpen) {
          setModalOpen(true);
          setSelectedOrderId(params.row[identifyRoute]);
          return;
        }
        if (
          params.field === cellName &&
          (params.field === "name" || params.field === "id")
        ) {
          if (longNavigate) {
            navigate("/orders/" + params.row[identifyRoute]);
          } else {
            navigate(location.pathname + "/" + params.row[identifyRoute]);
          }
        }
        if (params.field === cellName && params.field === "amount") {
          event.stopPropagation();
        }
      };

  return (
    <div className="w-full h-full mt-2 mb-10">
      <DataGrid
        className="w-auto"
        paginationMode="server"
        rowCount={props.paginationModel?.total ?? 0}
        rows={props.rows}
        columns={props.columns}
        checkboxSelection={!noCheckboxSelection}
        onRowSelectionModelChange={props.onRowSelection}
        rowSelectionModel={props.selectedRowIds}
        pagination={true}
        paginationModel={props.paginationModel}
        onPaginationModelChange={handlePaginationChange}
        pageSizeOptions={[10]}
        onCellClick={handleCellClick}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#EAECF0",
          },
          "& .MuiDataGrid-cell": {
            border: "1px solid #EAECF0",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#EAECF0",
            border: "1px solid #EAECF0",
          },
        }}
      />
    </div>
  );
}

export default Table;
