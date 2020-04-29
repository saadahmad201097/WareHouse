/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import Table from '../../components/Table/Table.js';
import axios from 'axios';
import { getItemsUrl, deleteItemUrl } from '../../public/endpoins';
import Loader from 'react-loader-spinner';

import SearchBar from '../../components/SearchBar/Searchbar.js';

const tableHeading = [
  'Name',
  'Description',
  'Sub Class',
  'Unit',
  'Vendor Id',
  'Purchase Price',
  'BU Price',
  'Sale Price',
  'Bar Code',
  'Actions'
];

const tableDataKeys = [
  'name',
  'description',
  'subClass',
  'unit',
  'vendorId',
  'purchasePrice',
  'buPrice',
  'salePrice',
  'barCode'
];

export default function Items(props) {
  const [itemsArray, setItem] = useState('');
  const [addItem, setaddItem] = useState(false);
  const [editItem, seteditItem] = useState(false);
  const [deleteItem, setdeleteItem] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  async function getItems() {
    const response = await axios
      .get(getItemsUrl)
      .then(res => {
        if (res.data.success) {
          // console.log('response of items', res.data.data);
        }
        // else if (!res.data.success) {
        //   this.setState({ tr: true });
        // }
        return res;
      })
      .catch(e => {
        console.log('error is ', e);
      });

    if (response && response.status === 200) {
      setItem(response.data.data);
      console.log('res===>>>', response);
    }
  }

  useEffect(() => {
    console.log('use effect called');
    getItems();
  }, []);

  const addNewItem = () => {
    let path = `items/next/add`;
    props.history.push({
      pathname: path,
      state: { comingFor: 'AddItems' }
    });
  };

  function handleEdit(item) {
    let path = `items/next/edit`;
    props.history.push({
      pathname: path,
      state: { comingFor: 'EditItems', selectedItem: item }
    });
  }

  function handleDelete(id) {
    setModalVisible(true);
    setdeleteItem(id);
  }

  async function onConfirmDelete() {
    console.log(deleteItem);
    const params = {
      _id: deleteItem
    };

    await axios
      .delete(deleteItemUrl + '/' + params._id)
      .then(res => {
        if (res.data.success) {
          console.log('response after deletion', res);
          setdeleteItem('');
          setModalVisible(false);
          window.location.reload(false);
        }
        // else if (!res.data.success) {
        //   this.setState({ tr: true });
        // }
        return res;
      })
      .catch(e => {
        console.log('error while deletion ', e);
        setModalVisible(false);
        setdeleteItem('');
      });
  }


  return (
    <div>
      {itemsArray ? (
        <div className="container">
          <div className="row">
            <div
              className="col-md-6 col-sm-12 col-lg-8"
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: '2%'
              }}
            >
              <Button
                onClick={addNewItem}
                style={{ width: 65, height: 65, borderRadius: 65 / 2 }}
                variant="contained"
                color="primary"
              >
                <i className="zmdi zmdi-plus zmdi-hc-3x"></i>
              </Button>
            </div>

            <div
              className="col-md-6 col-sm-12 col-lg-4"
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: '2%'
              }}
            >
              <SearchBar placeHolder={'Search Items'} />
            </div>
          </div>

          <Table
            tableData={itemsArray}
            tableDataKeys={tableDataKeys}
            tableHeading={tableHeading}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />

      
          <Modal
            open={modalVisible}
            style={{
              backgroundColor: '#72101e',
              borderRadius: 10,
              // width: '60%',
              height: '40%',
              marginLeft: '15%',
              marginRight: '15%',
              marginTop: '10%',
              // marginBottom:"10%",
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              flex: 1,
              position: 'fixed'
            }}
            // onClose={() => setModalVisible(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div
              style={
                {
                  // width: '100%',
                  // height: '60%',
                }
              }
            >
              <h4
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontFamily: 'Ubuntu',
                  // fontSize: 25,
                  textAlign: 'center'
                }}
              >
                Are you sure want to delete the item?
              </h4>

              <div
                style={{
                  display: 'flex',
                  marginTop: '4%',
                  justifyContent: 'space-evenly'
                }}
              >
                <Button
                  onClick={() => {
                    setModalVisible(false);
                    setdeleteItem('');
                  }}
                  variant="contained"
                >
                  Cancel
                </Button>

                <Button
                  style={{ marginRight: '3%' }}
                  onClick={() => onConfirmDelete()}
                  variant="contained"
                  color="primary"
                >
                  Done
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      ) : (
        <div
          style={{
            width: '70%',
            height: '100%',
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Loader type="TailSpin" color="red" height={50} width={50} />
        </div>
      )}
    </div>
  );
}

{
  /* <GridContainer>
<GridItem xs={12} sm={12} md={12}>
  <Card plain>
    <CardHeader plain color="primary">
      <h4 className={classes.cardTitleWhite}>Material Design Icons</h4>
      <p className={classes.cardCategoryWhite}>
        Handcrafted by our friends from{" "}
        <a
          href="https://design.google.com/icons/?ref=creativetime"
          target="_blank"
        >
          Google
        </a>
      </p>
    </CardHeader>
    <CardBody>
      <Hidden only={["sm", "xs"]}>
        <iframe
          className={classes.iframe}
          src="https://material.io/icons/"
          title="Icons iframe"
        >
          <p>Your browser does not support iframes.</p>
        </iframe>
      </Hidden>
      <Hidden only={["lg", "md"]}>
        <GridItem xs={12} sm={12} md={6}>
          <h5>
            The icons are visible on Desktop mode inside an iframe. Since
            the iframe is not working on Mobile and Tablets please visit
            the icons on their original page on Google. Check the
            <a
              href="https://design.google.com/icons/?ref=creativetime"
              target="_blank"
            >
              Material Icons
            </a>
          </h5>
        </GridItem>
      </Hidden>
    </CardBody>
  </Card>
</GridItem>
</GridContainer> */
}
