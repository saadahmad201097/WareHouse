/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// core components
import styles from 'assets/jss/material-dashboard-react/components/tableStyle.js';

import TablePagination from '@material-ui/core/TablePagination';


const useStyles = makeStyles(styles);

// export default function CustomTable(props) {
//   const classes = useStyles(styles);
//   const { tableHeading, tableData, tableDataKeys, tableHeaderColor } = props;

//   return (
//     <div className={classes.tableResponsive}>
//       <Table className={classes.table}>
//         {tableHeading !== undefined ? (
//           <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
//             <TableRow className={classes.tableHeadRow}>
//               {tableHeading.map((prop, key) => {
//                 return (
//                   <TableCell
//                     className={classes.tableCell + ' ' + classes.tableHeadCell}
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
//                 {tableDataKeys
//                   ? tableDataKeys.map((val, key) => {
//                       return (
//                         <TableCell className={classes.tableCell} key={key}>
//                           {prop[val]}
//                         </TableCell>
//                       );
//                     })
//                   : null}
//                 <TableCell
//                   style={{
//                     cursor: 'pointer'
//                   }}
//                   className={classes.tableCell}
//                   colSpan="2"
//                 >
//                   <span onClick={() => props.handleEdit(prop)}>
//                     <i className="zmdi zmdi-edit zmdi-hc-2x" />
//                   </span>
//                   <span onClick={() => props.handleDelete(prop._id)}>
//                     <i className=" ml-10 zmdi zmdi-delete zmdi-hc-2x" />
//                   </span>
//                 </TableCell>

//                 {/* <TableCell
//                   onClick={() => props.handleDelete(prop._id)}
//                   style={{ cursor: 'pointer' }}
//                   className={classes.tableCell}
//                 >
//                   <i className="zmdi zmdi-delete zmdi-hc-2x" />
//                 </TableCell> */}
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>

//     </div>
//   );
// }

// CustomTable.defaultProps = {
//   tableHeaderColor: 'gray'
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

export default function CustomTable(props) {
  const { tableHeading, tableData, tableDataKeys, tableHeaderColor } = props;

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHeading !== undefined ? (
          <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
            <TableRow className={classes.tableHeadRow}>
              {tableHeading.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + ' ' + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((prop, index) => {
              return (
                <TableRow key={index} className={classes.tableBodyRow}>
                  {tableDataKeys
                    ? tableDataKeys.map((val, key) => {
                        return (
                          <TableCell className={classes.tableCell} key={key}>
                            {prop[val]}
                          </TableCell>
                        );
                      })
                    : null}
                  <TableCell
                    style={{
                      cursor: 'pointer'
                    }}
                    className={classes.tableCell}
                    colSpan="2"
                  >
                    <span onClick={() => props.handleEdit(prop)}>
                      <i className="zmdi zmdi-edit zmdi-hc-2x" />
                    </span>
                    <span onClick={() => props.handleDelete(prop._id)}>
                      <i className=" ml-10 zmdi zmdi-delete zmdi-hc-2x" />
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[2, 4]}
        component="div"
        count={props.tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray'
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray'
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
