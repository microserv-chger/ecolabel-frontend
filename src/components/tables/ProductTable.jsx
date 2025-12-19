import { DataGrid } from "@mui/x-data-grid";
import StatusBadge from "../StatusBadge.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog.jsx";

export default function ProductTable({ rows = [], onDelete }) {
  const [selectedId, setSelectedId] = useState(null);

  const columns = [
    { field: "name", headerName: "NAME", flex: 1 },
    { field: "gtin", headerName: "GTIN", flex: 1 },
    {
      field: "status",
      headerName: "STATUS",
      flex: 0.7,
      renderCell: (params) => <StatusBadge status={params.value} />,
      sortable: false,
    },
    { field: "score", headerName: "SCORE", flex: 0.7 },
    { field: "dateParsing", headerName: "DATE PARSING", flex: 1 },
    { field: "brand", headerName: "MARQUE", flex: 1 },
    {
      field: "actions",
      headerName: "",
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={() => setSelectedId(params.row.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <div style={{ height: 520, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          pageSizeOptions={[10, 20, 50]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>

      {/* Confirmation dialog */}
      <ConfirmDeleteDialog
        open={Boolean(selectedId)}
        onClose={() => setSelectedId(null)}
        onConfirm={() => {
          onDelete(selectedId);
          setSelectedId(null);
        }}
      />
    </>
  );
}
