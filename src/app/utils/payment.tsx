"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Payment = ({ totalPrice }: { totalPrice: number }) => {
  const transactionUUID = useMemo(() => uuidv4(), []);
  const [formData, setFormData] = useState<{
    total_amount: string;
    transaction_uuid: string;
    product_code: string;
    signature: string;
  } | null>(null);

  useEffect(() => {
    const fetchSignature = async () => {
      try {
        const res = await axios.post("/api/signature", {
          total_amount: totalPrice.toFixed(2), // ensure it's string with 2 decimals
          transaction_uuid: transactionUUID,
          product_code: "EPAYTEST",
        });

        setFormData(res.data); // use exactly what the backend signed
      } catch (err) {
        console.error("Error fetching signature:", err);
      }
    };

    fetchSignature();
  }, [totalPrice, transactionUUID]);

  if (!formData) return <p>Loading payment...</p>;

  return (
    <form
      action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
      method="POST"
      className="space-y-4"
    >
      {/* Required signed fields */}
      <input type="hidden" name="total_amount" value={formData.total_amount} />
      <input type="hidden" name="transaction_uuid" value={formData.transaction_uuid} />
      <input type="hidden" name="product_code" value={formData.product_code} />
      <input type="hidden" name="signed_field_names" value="total_amount,transaction_uuid,product_code" />
      <input type="hidden" name="signature" value={formData.signature} />

      {/* Optional additional charges — zero here */}
      <input type="hidden" name="amount" value={formData.total_amount} />
      <input type="hidden" name="tax_amount" value="0" />
      <input type="hidden" name="product_service_charge" value="0" />
      <input type="hidden" name="product_delivery_charge" value="0" />

      {/* Success and failure URLs */}
      <input type="hidden" name="success_url" value="https://munnasaloon.vercel.app/sucess/invoice" />
      <input type="hidden" name="failure_url" value="https://munnasaloon.vercel.app/sucess/invoice" />

      <input
        type="submit"
        value="Proceed to Payment"
        className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
      />
    </form>
  );
};

export default Payment;
