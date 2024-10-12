import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
} from "@mui/material";
import AdminHome from "../Common/AdminHome";
import { useNavigate, useParams } from "react-router";
import { API_URL } from "../../../apiservice/Apiservice";
import axios from "axios";
import moment from "moment";

const BookedCustomers = () => {
  const { id } = useParams();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [details, setDetails] = useState([]);
  console.log(details);

  useEffect(() => {
    axios
      .get(`${API_URL}/adminviewtrip/${id}`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching details:", error);
      });
  }, [id]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedTrips = details.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <>
      <AdminHome />
      {/* <div style={{ position: 'relative', height: '50px',marginTop:'-400px' }}>
            <h4 style={{ position: 'absolute', top: '10px', left: '350px' }}>haii</h4>
         </div> */}
      <div>
        <TableContainer
          component={Paper}
          style={{
            width: "70%",
            margin: "50px auto",
            marginLeft: "350px",
            marginTop: "-300px",
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  Customer Name
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTrips.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell component="th" scope="row">
                    customer name
                  </TableCell>

                  <TableCell>Rs{trip.amount}</TableCell>

                  <TableCell>ststuss</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={details.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) =>
            setRowsPerPage(parseInt(event.target.value, 10))
          }
          style={{ marginLeft: "12px" }}
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "16px",
            marginLeft: "10px",
            "& .MuiTablePagination-select": {
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
            },
            "& .MuiTablePagination-actions": {
              "& .MuiIconButton-root": {
                color: "#1976d2",
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default BookedCustomers;
