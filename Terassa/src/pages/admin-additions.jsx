/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import {
  Spinner,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from 'reactstrap';
import Layout from '../components/layout';
import AdditionalEditGroup from '../components/additionalEdit/additionaEditGroup';

export default () => {
  const [answer, setData] = useState('error');

  useEffect(() => {
    const fetchData = async () => {
      const result = await firebase
        .database()
        .ref('additionals')
        .once('value')
        .then((snapshot) => snapshot.val());
      setData(result);
    };
    fetchData();
  }, []);
  console.log(answer);
  const [isEdit, setIsEdit] = useState('');

  function writeNewAdditions(additions) {
    firebase.database().ref('additionals').set(additions);
  }

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  function addNewCategory() {
    const newElement = [
      {
        cost: '0',
        description: '...',
        img: 'additionals/empty.jpg',
        name: 'New additional',
        weight: '0 gr.',
      },
    ];
    const name = document.getElementById('name-of-new-category').value;
    const newAdditions = { ...answer };
    newAdditions[name] = newElement;
    setData(newAdditions);
    toggle();
    setIsEdit(newAdditions[name][0].name);
  }

  return (
    <>
      <Layout>
        <main className="pt-3 pb-3">
          <div className="additional-edit d-flex flex-wrap">
            <h2>Edit additionals</h2>
            <Button onClick={() => toggle()}>Add Category</Button>
            <Button onClick={() => writeNewAdditions(answer)}>Update</Button>
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Cost</th>
                  <th>Weight</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Cost</th>
                  <th>Weight</th>
                  <th>Image</th>
                </tr>
              </tfoot>
              <tbody>
                {typeof answer === 'object' ? (
                  Object.keys(answer).map((groupName) => (
                    <AdditionalEditGroup
                      key={groupName}
                      groupName={groupName}
                      groupElements={Array.from(answer[groupName])}
                      additionsObject={answer}
                      setAdditionsObject={setData}
                      isEdit={isEdit}
                      setIsEdit={setIsEdit}
                    />
                  ))
                ) : (
                  <>
                    <tr>
                      <td colSpan="5">
                        <Spinner color="primary" />
                        <span>Loading data...</span>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </main>
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create new category:</ModalHeader>
            <ModalBody>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Enter name:</InputGroupText>
                </InputGroupAddon>
                <Input pattern="[A-Za-z]{2,20}" required id="name-of-new-category" />
              </InputGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => {
                  if (/[A-Za-z]{2,20}/.test(document.getElementById('name-of-new-category'))) {
                    addNewCategory();
                  }
                }}
              >
                Create
              </Button>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </Layout>
    </>
  );
};
