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
import { fetchLeaders } from "../../../redux/actions/authActions";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router";

const ViewTravelLeaders = () => {
  const dispatch = useDispatch();
  const leaders = useSelector((state) => state.reducer.user.leaders);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  console.log(leaders, "leadders");
  const id = leaders.id;
  console.log(id);

  console.log(leaders);

  useEffect(() => {
    dispatch(fetchLeaders());
  }, [dispatch]);

  const handleBlock = (id) => {
    // setLoading(true);
    axios
      .post(`http://localhost:8000/block/${id}/`)
      .then((response) => {
        console.log("Accepted:", response.data);
        Swal.fire({
          icon: "success",
          title: "Action performed Successfully!",
          text: "Action performed Successfully!",

          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          dispatch(fetchLeaders());
        });
      })
      .catch((error) => {
        console.error("Error accepting:", error);
      });
  };

  const handleDetails = (id) => {
    console.log(id);
    navigate(`/viewleadertrip/${id}`);
  };
  // const traveller = [users.travellers]

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 5));
  //   setPage(0);
  // };

  const paginatedUsers = leaders.slice(
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
          Travel Leaders
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
                <TableCell style={{ fontWeight: "bold" }}>Trips</TableCell>

                <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Payment Details
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((traveller) => (
                <TableRow key={traveller.id}>
                  <TableCell component="th" scope="row">
                    <AccountCircleIcon
                      style={{ verticalAlign: "middle", marginRight: "8px" }}
                    />
                    {traveller.user_id.username}
                  </TableCell>
                  <TableCell>{traveller.user_id.email}</TableCell>
                  <TableCell>{traveller.user_id.date_joined}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleDetails(traveller.user_id.id);
                      }}
                    >
                      view{" "}
                    </Button>
                  </TableCell>

                  <TableCell>
                    {traveller.user_id.is_block === true ? (
                      <Button
                        variant="contained"
                        onClick={() => handleBlock(traveller.user_id.id)}
                        color={
                          traveller.user_id.is_block === false
                            ? "success"
                            : "error"
                        }
                      >
                        UNBLOCK
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => handleBlock(traveller.user_id.id)}
                        color={
                          traveller.user_id.is_block === false
                            ? "success"
                            : "error"
                        }
                      >
                        BLOCK
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    Acount Holdername:{traveller.bank_account_name},Account
                    Number:{traveller.bank_account_number},Bank Name:
                    {traveller.bank_name},IFSC CODE:{traveller.ifsc_code}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={leaders.length}
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

export default ViewTravelLeaders;
