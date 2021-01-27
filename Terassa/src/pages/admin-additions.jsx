import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { Spinner, Button } from 'reactstrap';
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
  return (
    <>
      <Layout>
        <main>
          <div className="additional-edit d-flex flex-wrap">
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
            <Button>Send</Button>
          </div>
        </main>
      </Layout>
    </>
  );
};
