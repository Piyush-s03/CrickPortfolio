import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <form id="contact" action="https://formspree.io/f/xblklqbn" method="POST">
  <div className="mb-3">
     <h2 className="text-center mb-4 display-5 fw-bold">Contact Us</h2>
    <label className="form-label">Name</label>
    <input type="text" name="name" className="form-control" required />
  </div>
  <div className="mb-3">
    <label className="form-label">Email</label>
    <input type="email" name="email" className="form-control" required />
  </div>
  <div className="mb-3">
    <label className="form-label">Message</label>
    <textarea name="message" className="form-control" rows="4" required></textarea>
  </div>
  <button type="submit" className="btn btn-primary">Send</button>
</form>

  );
};

export default Contact;
