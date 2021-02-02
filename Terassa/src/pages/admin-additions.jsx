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
  FormFeedback,
} from 'reactstrap';
import { BiReset } from '@react-icons/all-files/bi/BiReset';
import { AiFillFolderAdd } from '@react-icons/all-files/ai/AiFillFolderAdd';
import ReactNotification, { store } from 'react-notifications-component';
import Layout from '../components/layout';
import AdditionalEditGroup from '../components/additionalEdit/additionaEditGroup';

export default () => {
  const [defaultAdditions, setDefaultAdditions] = useState('');

  const fetchDataDefault = async () => {
    const result = await firebase.database().ref('defaultAdditionals').once('value').then((snapshot) => snapshot.val());
    setDefaultAdditions(result);
  };
  useEffect(() => {
    fetchDataDefault();
  }, []);

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
        id: `${Date.now()}`,
      },
    ];
    const name = document.getElementById('name-of-new-category').value;
    const newAdditions = { ...answer };
    newAdditions[name] = newElement;
    setData(newAdditions);
    setIsEdit(newAdditions[name][0].id);
    toggle();
  }

  const tableClasses = isEdit ? 'table table-bordered is-edit' : 'table table-bordered';

  return (
    <>
      <Layout>
        <ReactNotification />
        <main className="pt-3 pb-3">
          <div className="additional-edit p-3 d-flex flex-wrap">
            <div className="editions-header pb-3">
              <h2>Edit additionals</h2>
              <div>
                <Button
                  color="primary"
                  className="btn-icon-split"
                  onClick={() => {
                    fetchDataDefault();
                    writeNewAdditions(defaultAdditions);
                    setData(defaultAdditions);
                    setIsEdit('');
                  }}
                >
                  <span className="icon text-white-50"><BiReset /></span>
                  <span className="text">Reset</span>
                </Button>
                <Button
                  color="primary"
                  className="btn-icon-split"
                  onClick={() => {
                    if (!isEdit) {
                      toggle();
                    } else {
                      store.addNotification({
                        title: 'Save changes!',
                        message: 'Please save all changes you made.',
                        type: 'warning',
                        insert: 'top',
                        container: 'top-right',
                        animationIn: ['animate__animated animate__fadeIn'],
                        animationOut: ['animate__animated animate__fadeOut'],
                        dismiss: {
                          duration: 5000,
                        },
                      });
                    }
                  }}
                >
                  <span className="icon text-white-50"><AiFillFolderAdd /></span>
                  <span className="text">Add Category</span>
                </Button>
              </div>

            </div>
            <table className={tableClasses} id="dataTable" width="100%" cellSpacing="0">
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
                      writeNewAdditions={writeNewAdditions}
                    />
                  ))
                ) : (
                  <>
                    <tr>
                      <td className="d-flex" colSpan="5">
                        <Spinner color="primary" />
                        <span className="m-auto align-self-center">Loading data...</span>
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
                <FormFeedback id="invalid-form-message" className="d-none">
                  Please enter the name of the group in Latin letters from 2 to 20 characters.
                </FormFeedback>
              </InputGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => {
                  if (
                    /[A-Za-z]{2,20}/.test(document.getElementById('name-of-new-category').value)
                  ) {
                    addNewCategory();
                    setTimeout(() => document.getElementById('editedElement').scrollIntoView({
                      behavior: 'smooth',
                    }), 500);
                  } else {
                    const input = document.getElementById('name-of-new-category');
                    input.classList.add('is-invalid');
                    document.getElementById('invalid-form-message').classList.remove('d-none');
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
