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
  CircularProgress,
  TablePagination,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminHome from "../Common/AdminHome";
import { useDispatch, useSelector } from "react-redux";
import { fetchTravellers } from "../../../redux/actions/authActions";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../../apiservice/Apiservice";

const ViewTravellers = () => {
  const users = useSelector((state) => state.reducer.user.travellers);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  console.log(users, "travellers");
  // const traveller = [users.travellers]

  useEffect(() => {
    dispatch(fetchTravellers());
  }, [dispatch]);

  const handleBlock = (id) => {
    // setLoading(true);
    axios
      .post(`${API_URL}/block/${id}/`)
      .then((response) => {
        console.log("Accepted:", response.data);
        Swal.fire({
          icon: "success",
          title: "Action performed Successfully!",
          text: "Action performed Successfully!",

          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          dispatch(fetchTravellers());
        });
      })
      .catch((error) => {
        console.error("Error accepting:", error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  // const leaders = [
  //     { username: 'Max', email: 'max123@mail.com', joinedDate: '12.09.2019', status: 'Block' },
  //     { username: 'Maggie', email: 'maggie123@gmail.com', joinedDate: '12.09.2019', status: 'Unlock' },
  //     { username: 'John', email: 'john123@gmail.com', joinedDate: '12.09.2019', status: 'Block' },
  //   ];
  //     if (loading) return <CircularProgress style={{ display: 'block', margin: '50px auto' }} />;
  // if (error) return <div>Error: {error}</div>;
  return (
    <>
      <AdminHome />
      <div style={{ textAlign: "center", marginTop: "-350px" }}>
        <Typography variant="h4" style={{ fontWeight: "bold" }}>
          Travellers
        </Typography>
      </div>

      <div>
        <TableContainer
          component={Paper}
          style={{ width: "70%", margin: "50px auto", marginLeft: "350px" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>User Name</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Joined Date
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((traveller) => (
                <TableRow key={traveller.id}>
                  <TableCell component="th" scope="row">
                    <AccountCircleIcon
                      style={{ verticalAlign: "middle", marginRight: "8px" }}
                    />
                    {traveller.username}
                  </TableCell>
                  <TableCell>{traveller.email}</TableCell>
                  <TableCell>{traveller.date_joined}</TableCell>
                  <TableCell>
                    {traveller.is_block === true ? (
                      <Button
                        variant="contained"
                        onClick={() => handleBlock(traveller.id)}
                        color={
                          traveller.is_block === false ? "success" : "error"
                        }
                      >
                        UNBLOCK
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => handleBlock(traveller.id)}
                        color={
                          traveller.is_block === false ? "success" : "error"
                        }
                      >
                        BLOCK
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={users.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          // onRowsPerPageChange={handleChangeRowsPerPage}
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

export default ViewTravellers;
