// import React from "react";
// import PropTypes from "prop-types";
// // @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// // core components
// import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

// const useStyles = makeStyles(styles);

// export default function CustomTable(props) {
//   const classes = useStyles();
//   const { tableHead, tableData, tableHeaderColor } = props;
//   return (
//     <div className={classes.tableResponsive}>
//       <Table className={classes.table}>
//         {tableHead !== undefined ? (
//           <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
//             <TableRow className={classes.tableHeadRow}>
//               {tableHead.map((prop, key) => {
//                 return (
//                   <TableCell
//                     className={classes.tableCell + " " + classes.tableHeadCell}
//                     key={key}
//                   >
//                     {prop}
//                   </TableCell>
//                 );
//               })}
//             </TableRow>
//           </TableHead>
//         ) : null}
//         <TableBody>
//           {tableData.map((prop, key) => {
//             return (
//               <TableRow key={key} className={classes.tableBodyRow}>
//                 {prop.map((prop, key) => {
//                   return (
//                     <TableCell className={classes.tableCell} key={key}>
//                       {prop}
//                     </TableCell>
//                   );
//                 })}
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

// CustomTable.defaultProps = {
//   tableHeaderColor: "gray"
// };

// CustomTable.propTypes = {
//   tableHeaderColor: PropTypes.oneOf([
//     "warning",
//     "primary",
//     "danger",
//     "success",
//     "info",
//     "rose",
//     "gray"
//   ]),
//   tableHead: PropTypes.arrayOf(PropTypes.string),
//   tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
// };

/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(styles);

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },

  tableData: {
    fontSize: "0.8125rem",
    fontWeight: "400",
    fontFamily: "Ubuntu",
  },
};

const tableHead = [
  "Id",
  "Name",
  "Description",
  "Sub Class",
  "Unit",
  "Vendor Id",
  "Purchase Price",
  "BU Price",
  "Sale Price",
  "Bar Code",
  "Edit",
  "Delete",
];

const tableData = [
  {
    id: "1",
    name: "Cotton",
    desc:
      "Cotton is of the best quality. We ensure it we will provide the quality at its best",
    sub_class: "Garments",
    unit: "Levis",
    vendor_id: "23",
    purchase_price: "100",
    bu_price: "500",
    sales_price: "250",
    bar_code: "023333022",
  },
  {
    id: "2",
    name: "Cotton",
    desc:
      "Cotton is of the best quality. We ensure it we will provide the quality at its best",
    sub_class: "Garments",
    unit: "Levis",
    vendor_id: "23",
    purchase_price: "100",
    bu_price: "500",
    sales_price: "250",
    bar_code: "023333022",
  },
  {
    id: "3",
    name: "Cotton",
    desc:
      "Cotton is of the best quality. We ensure it we will provide the quality at its best",
    sub_class: "Garments",
    unit: "Levis",
    vendor_id: "23",
    purchase_price: "100",
    bu_price: "500",
    sales_price: "250",
    bar_code: "023333022",
  },
  {
    id: "4",
    name: "Cotton",
    desc:
      "Cotton is of the best quality. We ensure it we will provide the quality at its best",
    sub_class: "Garments",
    unit: "Levis",
    vendor_id: "23",
    purchase_price: "100",
    bu_price: "500",
    sales_price: "250",
    bar_code: "023333022",
  },
  {
    id: "5",
    name: "Cotton",
    desc:
      "Cotton is of the best quality. We ensure it we will provide the quality at its best",
    sub_class: "Garments",
    unit: "Levis",
    vendor_id: "23",
    purchase_price: "100",
    bu_price: "500",
    sales_price: "250",
    bar_code: "023333022",
  },
  {
    id: "6",
    name: "Cotton",
    desc:
      "Cotton is of the best quality. We ensure it we will provide the quality at its best",
    sub_class: "Garments",
    unit: "Levis",
    vendor_id: "23",
    purchase_price: "100",
    bu_price: "500",
    sales_price: "250",
    bar_code: "023333022",
  },
  {
    id: "7",
    name: "Cotton",
    desc:
      "Cotton is of the best quality. We ensure it we will provide the quality at its best",
    sub_class: "Garments",
    unit: "Levis",
    vendor_id: "23",
    purchase_price: "100",
    bu_price: "500",
    sales_price: "250",
    bar_code: "023333022",
  },
  {
    id: "8",
    name: "Cotton",
    desc:
      "Cotton is of the best quality. We ensure it we will provide the quality at its best",
    sub_class: "Garments",
    unit: "Levis",
    vendor_id: "23",
    purchase_price: "100",
    bu_price: "500",
    sales_price: "250",
    bar_code: "023333022",
  },
];

export default function Items(props) {
  const classes = useStyles();

  const [tableHeading, setTableHeading] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(props.tableData);
    setTableHeading(props.tableHeading);
  }, []);



  return (
    <div>
      <Table
        size="small"
        aria-label="a dense table"
        component={Paper}
        style={{ marginTop: "3%" }}
      >
        <TableHead>
          <TableRow
            style={{ borderWidth: 5, borderColor: "black", borderRadius: 5 }}
          >
            {tableHeading &&
              tableHeading.map((item) => {
                return (
                  <TableCell colSpan={0.1} key={item}>
                    <span style={{ color: "black", fontFamily: "Ubuntu" }}>
                      {item}
                    </span>
                  </TableCell>
                );
              })}
          </TableRow>
        </TableHead>

        <TableBody>
          {tableData &&
            tableData.map((item) => {
              return (
                <TableRow key={item.id} className={classes.tableBodyRow}>
                  <TableCell style={{}}>
                    <span style={styles.tableData}>{item.id}</span>
                  </TableCell>

                  <TableCell>
                    <span style={styles.tableData}>{item.name}</span>
                  </TableCell>

                  <TableCell colSpan={1}>
                    <span style={styles.tableData}>{item.desc}</span>
                  </TableCell>

                  <TableCell>
                    <span style={styles.tableData}>{item.sub_class}</span>
                  </TableCell>

                  <TableCell>
                    <span style={styles.tableData}> {item.unit}</span>
                  </TableCell>

                  <TableCell>
                    <span style={styles.tableData}> {item.vendor_id}</span>
                  </TableCell>

                  <TableCell>
                    <span style={styles.tableData}> {item.purchase_price}</span>
                  </TableCell>

                  <TableCell>
                    <span style={styles.tableData}>{item.bu_price}</span>
                  </TableCell>

                  <TableCell>
                    <span style={styles.tableData}> {item.sales_price}</span>
                  </TableCell>

                  <TableCell>
                    <span style={styles.tableData}>{item.bar_code}</span>
                  </TableCell>

                  {props.handleEdit ? (
                    <TableCell
                      onClick={() => props.handleEdit(item)}
                      style={{ cursor: "pointer" }}
                      className={classes.tableCell}
                    >
                      <i className="zmdi zmdi-edit zmdi-hc-2x"></i>
                    </TableCell>
                  ) : (
                    undefined
                  )}

                  {props.handleDelete ? (
                    <TableCell
                      onClick={() => props.handleDelete()}
                      style={{ cursor: "pointer" }}
                      className={classes.tableCell}
                    >
                      <i className="zmdi zmdi-delete zmdi-hc-2x"></i>
                    </TableCell>
                  ) : (
                    undefined
                  )}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
