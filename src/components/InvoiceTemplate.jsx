import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./invoice.css";
import logo from "../assets/cloud9-logo.png";

export default function InvoiceTemplate() {

  const invoiceRef = useRef();
  const downloadPDF = async () => {
    const element = invoiceRef.current;

    const replacements = [];

    element.querySelectorAll("input, textarea").forEach(el => {
      const value = el.value || el.placeholder || "";

      const span = document.createElement("span");
      span.innerText = value;
      span.style.display = "block";
      span.style.fontSize = "13px";
      span.style.padding = "2px 0";
      span.style.width = el.offsetWidth + "px";
      span.style.height = el.offsetHeight + "px";
      span.style.lineHeight = getComputedStyle(el).lineHeight;
      span.style.fontFamily = getComputedStyle(el).fontFamily;
      span.style.fontWeight = getComputedStyle(el).fontWeight;

      el.style.display = "none";
      el.parentNode.insertBefore(span, el);

      replacements.push({ el, span });
    });

    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true
    });

    const img = canvas.toDataURL("image/jpeg", 1.0);

    const pdf = new jsPDF("p", "mm", "a4");

    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(img, "JPEG", 0, 0, width, height);
    pdf.save("invoice.pdf");

    replacements.forEach(({ el, span }) => {
      span.remove();
      el.style.display = "";
    });
  };

  function InputFields({ placeholder, value, bg = false }) {
    return (
      <input
        className={`master-input ${bg ? "bg" : ""}`}
        type="text"
        placeholder={placeholder}
        defaultValue={value}
      />
    );
  }

  return (
    <>
      <div ref={invoiceRef} className="container">
        <div className="invoice">
          <div className="header">
            <img src={logo} className="logo" />
            <div className="company">
              <h2>Cloud9 Broadband Services</h2>
              <span className="company-address">
                Flat No.10 Wing 'A' Shivpushpa Park Opp Apurva Medical
                Anandnagar Suncity Road Pune - 411051
                <br />
                Contact: 9325315202
                <br />
                Email: cloud9broadbandftth@gmail.com
              </span>
            </div>
          </div>
          <div className="invoiceTitle">INVOICE</div>
          <div className="infoGrid">
            <div className="left">
              <div className="row">
                <span>Customer code</span>
                <span><InputFields placeholder="Enter customer code" /></span>
              </div>
              <div className="row">
                <span>Customer name</span>
                <span><InputFields placeholder="Enter customer name" /></span>
              </div>
              <div className="row">
                <span>Email ID</span>
                <span><InputFields placeholder="Enter email ID" /></span>
              </div>
              <div className="row">
                <span>Mobile no</span>
                <span><InputFields placeholder="Enter mobile number" /></span>
              </div>
              <div className="row-address">
                <span>Address</span>
                <span>
                  <textarea
                    className="master-textArea"
                    placeholder="Enter address"
                  />
                </span>
              </div>
              <div className="row">
                <span>City</span>
                <span><InputFields value="Pune" /></span>
              </div>
              <div className="row">
                <span>State</span>
                <span><InputFields value="Maharashtra" /></span>
              </div>
              <div className="row">
                <span>Zipcode</span>
                <span><InputFields value="411051" /></span>
              </div>
            </div>

            <div className="right">
              <div className="row">
                <span>Bill date</span>
                <span><InputFields placeholder="Enter bill date" /></span>
              </div>
              <div className="row">
                <span>Due date</span>
                <span><InputFields placeholder="Enter due date" /></span>
              </div>
              <div className="row">
                <span>Invoice number</span>
                <span><InputFields placeholder="Enter invoice number" /></span>
              </div>
            </div>
          </div>

          <div className="summaryBar">
            <span>Billing Summary</span>
            <span>Past Due : 0.00</span>
            <span>
              Current Charges :
              <InputFields placeholder="Enter current charges" bg />
            </span>
            <span>
              Total Due :
              <InputFields placeholder="Enter total due" bg />
            </span>
          </div>

          <table className="billTable">
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Time period</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <InputFields placeholder="Enter description" />
                </td>
                <td>
                  <InputFields placeholder="Enter time period" />
                </td>
                <td>
                  <InputFields placeholder="Enter rate" />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="totals">
            <div className="words">
              <span>Total:</span>
              <span>
                  <InputFields placeholder="Enter total" />
              </span>
            </div>
            <div className="words">
              <span>Amount (in words):</span>
              <span>
                <InputFields placeholder="Enter amount in words" />
              </span>
            </div>
          </div>
          <div className="note">
            * Note: This is a system generated invoice. No signature required.
          </div>
        </div>
      </div>
      <button className="downloadBtn" onClick={downloadPDF}>
        Download PDF
      </button>
    </>
  );
}