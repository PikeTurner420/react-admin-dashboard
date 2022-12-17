import { Box } from "@mui/material";
import { GridToolbar, DataGrid } from "@mui/x-data-grid";

import Header from "../../components/Header";
import React, { Component } from "react";
import { themeSettings } from "../../theme";
import { tokens } from "../../theme";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
//import Stack from "@mui/material/Stack";

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataContactsCountry: [],
      dataContactsPrivate: [],
      isLoadedC: false,
      isLoadedP: false,
      alertCompany: null,
      alertPrivate: null,
    };
  }

  componentDidMount() {
    this.fetchCompanies();
    this.fetchPrivates();
  }

  hidealertCompany = () => {
    console.log("hideAlert");
    this.setState({
      alertCompany: <></>,
    });
  };

  hidealertPrivate = () => {
    console.log("hideAlert");
    this.setState({
      alertPrivate: <></>,
    });
  };

  showAlertsCompany(company) {
    this.setState({
      alertCompany: (
        <Alert
          severity="warning"
          action={
            <>
              <Button
                color="inherit"
                size="small"
                onClick={() => {
                  this.deleteCompany(company);
                  this.hidealertCompany();
                }}
              >
                DELETE
              </Button>
              <Button
                color="inherit"
                size="small"
                onClick={this.hidealertCompany}
              >
                CANCEL
              </Button>
            </>
          }
        >
          Attention deleting this company ({company}) you're going to delete all
          his purchase too
        </Alert>
      ),
    });
  }

  showAlertsPrivate(privateid) {
    this.setState({
      alertPrivate: (
        <Alert
          severity="warning"
          action={
            <>
              <Button
                color="inherit"
                size="small"
                onClick={() => {
                  this.deletePrivate(privateid);
                  this.hidealertPrivate();
                }}
              >
                DELETE
              </Button>
              <Button
                color="inherit"
                size="small"
                onClick={this.hidealertPrivate}
              >
                CANCEL
              </Button>
            </>
          }
        >
          Attention deleting this private ({privateid}) user you're going to
          delete all his purchase too
        </Alert>
      ),
    });
  }

  deleteCompany = (company) => {
    fetch("http://localhost:4567/v1/company/delete/" + company, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
    });
  };

  deletePrivate = (privateid) => {
    fetch("http://localhost:4567/v1/private/delete/" + privateid, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
    });
  };

  fetchCompanies() {
    fetch("http://localhost:4567/v1/companies")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataContactsCountry: data.data,
          isLoadedC: true,
        });
      })
      .then(() => console.log("Companies fetch"))
      .catch((er) => console.log(er));
  }

  fetchPrivates() {
    fetch("http://localhost:4567/v1/privates")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataContactsPrivate: data.data,
          isLoadedP: true,
        });
      })
      .then(() => console.log("Privates fetch"))
      .catch((er) => console.log(er));
  }

  render() {
    const theme = themeSettings();
    const colors = tokens(theme.palette.mode);
    var {
      dataContactsCountry,
      dataContactsPrivate,
      isLoadedC,
      isLoadedP,
      alertPrivate,
      alertCompany,
    } = this.state;
    console.log(dataContactsCountry, dataContactsPrivate);

    const companyColumns = [
      { field: "id", headerName: "ID", flex: 0.5 },
      { field: "registrarId", headerName: "Registrar ID" },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "email",
        headerName: "E-Mail",
        flex: 1,
      },
      {
        field: "employees_n",
        headerName: "Employees number",
        type: "number",
        flex: 1,
      },
      {
        field: "iban",
        headerName: "IBAN",
        flex: 1,
      },
      {
        field: "site",
        headerName: "Site",
        type: "number",
      },
      {
        field: "country",
        headerName: "Country",
        flex: 1,
      },
      {
        field: "button",
        headerName: "Delete",
        flex: 1,
        sortable: false,
        renderCell: (company) => {
          const onClick = () => {
            this.showAlertsCompany(company.row.id);
          };
          return (
            <Button
              onClick={onClick}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              Delete
            </Button>
          );
        },
      },
    ];
    const privateColumns = [
      { field: "id", headerName: "ID", flex: 0.5 },
      { field: "registrarId", headerName: "Registrar ID" },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "age",
        headerName: "Age",
        type: "number",
        headerAlign: "left",
        align: "left",
      },
      {
        field: "phone",
        headerName: "Phone Number",
        flex: 1,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
      },
      {
        field: "address",
        headerName: "Address",
        flex: 1,
      },
      {
        field: "button",
        headerName: "Delete",
        flex: 1,
        sortable: false,
        renderCell: (privateid) => {
          const onClick = () => {
            this.showAlertsPrivate(privateid.row.id);
          };
          return (
            <Button
              onClick={onClick}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              Delete
            </Button>
          );
        },
      },
    ];
    if (isLoadedC && isLoadedP) {
      return (
        <Box m="20px">
          <Header
            title="CONTACTS"
            subtitle="List of Contacts for Future Reference"
          />
          {alertCompany ? alertCompany : null}
          <Box
            m="0 0 40px 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: "#94e2cd",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#3e4396",
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "#1F2A40",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: "#3e4396",
              },
              "& .MuiCheckbox-root": {
                color: `${"#b7ebde"} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${"#e0e0e0"} !important`,
              },
            }}
          >
            <DataGrid
              rows={dataContactsCountry}
              columns={companyColumns}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
          {alertPrivate ? alertPrivate : null}
          <Box
            m="0 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: "#94e2cd",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#3e4396",
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "#1F2A40",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: "#3e4396",
              },
              "& .MuiCheckbox-root": {
                color: `${"#b7ebde"} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${"#e0e0e0"} !important`,
              },
            }}
          >
            <DataGrid
              rows={dataContactsPrivate}
              columns={privateColumns}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      );
    } else {
      return (
        <>
          <div>
            <h1>Loading...</h1>
          </div>
        </>
      );
    }
  }
}
export default Contacts;
