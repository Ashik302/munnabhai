"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const InvoicePage = () => {
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const base64Data = urlParams.get("data");

    let paymentStatus = "pending";

    // Step 1: Decode eSewa payment response if exists
    if (base64Data) {
      try {
        const decoded = atob(base64Data);
        const parsedPayment = JSON.parse(decoded);
        paymentStatus = parsedPayment.status?.toLowerCase() || "pending";
      } catch (err) {
        console.error("Error decoding payment data:", err);
      }
    }

    // Step 2: Get invoice from localStorage
    const raw = localStorage.getItem("invoiceData");
    if (raw) {
      try {
        const parsedInvoice = JSON.parse(raw);

        // Step 3: Add/Update trans_status
        const updatedInvoice = {
          ...parsedInvoice,
          trans_status: paymentStatus,
        };

        // Update localStorage
        localStorage.setItem("invoiceData", JSON.stringify(updatedInvoice));

        // Set state
        setInvoiceData(updatedInvoice);

        // Step 4: Send email
        const sendEmail = async () => {
          try {
            const res = await axios.post("/api/sendEmail", {
              data: updatedInvoice,
            });
            if (res.status === 200) setEmailSent(true);
          } catch (error) {
            console.error("Failed to send email:", error);
          }
        };

        sendEmail();
      } catch (err) {
        console.error("Error parsing invoice data:", err);
      }
    }

    setLoading(false);
  }, []);

  const calculateTotal = () => {
    if (!invoiceData?.services) return 0;
    return invoiceData.services.reduce(
      (acc: number, item: any) => acc + item.price * item.numberOfPersons,
      0
    );
  };

  if (loading) return <p className="text-center mt-20">Loading invoice...</p>;

  if (!invoiceData) return <p className="text-center mt-20">No invoice found.</p>;

  return (
    <section className="max-w-4xl mx-auto mt-20 px-4">
      <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">
        🧾 Your Invoice
      </h1>

      <div className="mb-6">
        <p><strong>Name:</strong> {invoiceData.username}</p>
        <p><strong>Email:</strong> {invoiceData.email}</p>
        <p><strong>Phone:</strong> {invoiceData.phone}</p>
        <p><strong>Branch:</strong> {invoiceData.branch}</p>
        <p><strong>Status:</strong> {invoiceData.trans_status}</p>
      </div>

      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-purple-100 text-left">
          <tr>
            <th className="p-3">Service</th>
            <th className="p-3">Type</th>
            <th className="p-3">Persons</th>
            <th className="p-3">Price</th>
            <th className="p-3">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.services.map((item: any, index: number) => (
            <tr key={index} className="border-t">
              <td className="p-3">{item.title}</td>
              <td className="p-3">{item.plan}</td>
              <td className="p-3">{item.numberOfPersons}</td>
              <td className="p-3">Rs. {item.price}</td>
              <td className="p-3">Rs. {item.price * item.numberOfPersons}</td>
            </tr>
          ))}
          <tr className="bg-purple-100 font-semibold">
            <td colSpan={4} className="p-3 text-right">
              Grand Total
            </td>
            <td className="p-3">Rs. {calculateTotal()}</td>
          </tr>
        </tbody>
      </table>

      {emailSent && (
        <p className="text-green-600 text-center mt-6">
          ✅ Invoice has been sent to your email.
        </p>
      )}
    </section>
  );
};

export default InvoicePage;
