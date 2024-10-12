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
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminHome from "../Common/AdminHome";
import { useNavigate } from "react-router-dom";
import api from "../../../axios-interceptors/AxiosInterceptors";
import axios from "axios";
import { API_URL } from "../../../apiservice/Apiservice";

const ReportRequests = () => {
  const [reports, setReports] = useState([]); // State to hold reports
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const navigate = useNavigate();
  console.log(reports, "reports..");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`${API_URL}/reports/`);
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedReports = reports.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <>
      <AdminHome />
      <div style={{ textAlign: "center", marginTop: "-350px" }}>
        <Typography variant="h4" style={{ fontWeight: "bold" }}>
          Complaints
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
                <TableCell style={{ fontWeight: "bold" }}>
                  Reporter Name
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Reporter Email
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Reported User Name
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Reported User Email
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <AccountCircleIcon
                      style={{ verticalAlign: "middle", marginRight: "8px" }}
                    />
                    {report.reported_user_name}
                  </TableCell>
                  <TableCell>{report.reported_user_email} </TableCell>
                  <TableCell>
                    <AccountCircleIcon
                      style={{ verticalAlign: "middle", marginRight: "8px" }}
                    />
                    {report.reporter_name}
                  </TableCell>
                  <TableCell>{report.reporter_email}</TableCell>
                  <TableCell>{report.reason} </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={reports.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
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

export default ReportRequests;
