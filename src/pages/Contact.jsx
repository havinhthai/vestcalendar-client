/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import Sale01 from 'components/sale/Sale01';
import PageTitle from 'components/pagetitle';

import img from 'assets/images/layout/contact.jpg';

function Contact() {
  return (
    <div>
      <PageTitle heading="Contact" title="Contact" />

      <section className="contact">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-md-12">
              <div className="image">
                <img src={img} alt="" />
              </div>
            </div>
            <div className="col-xl-6 col-md-12">
              <div className="contact-main">
                <div className="block-text center">
                  <h3 className="heading">Leave a message for us</h3>
                  <p className="desc fs-20">Get in touch with VestCalendar</p>
                </div>

                <form>
                  <div className="form-group">
                    <label>Your name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter mail"
                    />
                  </div>

                  <div className="form-group">
                    <label>Subject </label>
                    <select className="form-control" id="exampleFormControlSelect1">
                      <option>NFT Items</option>
                      <option>NFT Items 1</option>
                      <option>NFT Items 1</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Message </label>
                    <textarea
                      cols="30"
                      rows="10"
                      className="form-control"
                      placeholder="Enter your message"
                    />
                  </div>
                  <button type="submit" className="btn-action">Send message</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Sale01 />
    </div>
  );
}

export default Contact;
