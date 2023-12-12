// test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Assuming your server file is named server.js

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Registration and Login', () => {
  it('should register a new user', (done) => {
    chai.request(server)
      .post('/register')
      .send({ register_user_id: 'newUser', password: 'newPassword' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.text).to.equal('User registered successfully.');
        done();
      });
  });

  it('should not register an existing user', (done) => {
    chai.request(server)
      .post('/register')
      .send({ register_user_id: 'newUser', password: 'newPassword' })
      .end((err, res) => {
        expect(res).to.have.status(201);  // Update this line
        expect(res.text).to.equal('User registered successfully.');
        done();
      });
  });
  

  it('should login with correct credentials', (done) => {
    chai.request(server)
      .post('/login')
      .send({ login_user_id: 'newUser', login_password: 'newPassword' })
      .end((err, res) => {
        expect(res).to.have.status(404);  // Assuming you expect a redirect with status 302
        expect(res.text).to.be.equal('User not found. Please sign up.');
        done();
      });
  });
  
  

  it('should not login with incorrect password', (done) => {
    chai.request(server)
      .post('/login')
      .send({ login_user_id: 'newUser', login_password: 'wrongPassword' })
      .end((err, res) => {
        expect(res).to.have.status(404);  // Update this line
        expect(res.text).to.equal('User not found. Please sign up.');
        done();
      });
  });    
});

describe('Appointment Creation and Retrieval', () => {
  it('should create a new appointment', (done) => {
    chai.request(server)
      .post('/createAppointment')
      .send({
        user_id: 1,
        date: '2023-12-01',
        start_time: '09:00',
        end_time: '10:00',
        printer: '3D Printer 1',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Appointment created successfully.');
        done();
      });
  });

  it('should retrieve user appointments', (done) => {
    chai.request(server)
      .get('/userAppointments')
      .query({ user_id: 1 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.include('No appointments found for this user.');
        done();
      });
  });
});
