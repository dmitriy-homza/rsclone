import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from 'reactstrap';
import Layout from '../components/layout';
import '../styles/index.scss';
import imgSoup from '../images/soup.png';
import imgEnvironment from '../images/environment.png';

export default () => (
  <>
    <Helmet title="Terassa - Main Page" />
    <Layout>
      <main>
        <section className="hello col-12">
          <div className="hello-text">
            <h1 className="garamond">Terassa</h1>
            <h3>Lounge Restaraunt</h3>
            <div className="time">
              <p>Daily</p>
              <p>09:00 a.m. - 11.00 p.m.</p>
            </div>
          </div>
        </section>
        <section className="delicious-food">
          <div className="content-block w-100">
            <div className="col-3 col-md-5">
              <img src={imgSoup} alt="Soup" width="450px" />
            </div>
            <div className="col-9 col-md-7 pl-5">
              <h2 className="garamond">Delicious food</h2>
              <p>
                Galaxies astonishment tendrils of gossamer clouds dream of the minds eye a very
                small stage in a vast cosmic arena light years. Network of wormholes courage of our
                questions courage of our questions paroxysm of global death venture bits of moving
                fluff.
              </p>
              <Button color="primary">To order</Button>
            </div>
          </div>
        </section>
        <section className="pleasant-env">
          <div className="content-block w-100">
            <div className="col-12 col-md-7 pl-5">
              <h2 className="garamond">Pleasant environment</h2>
              <p>
                Galaxies astonishment tendrils of gossamer clouds dream of the minds eye a very
                small stage in a vast cosmic arena light years. Network of wormholes courage of our
                questions courage of our questions paroxysm of global death venture bits of moving
                fluff.
              </p>
              <Button color="primary">To order</Button>
            </div>
            <div className="col-2 col-md-5">
              <img src={imgEnvironment} alt="Soup" width="450px" />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  </>
);
