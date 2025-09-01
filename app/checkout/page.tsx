"use client";

import useFetch from "../../components/hooks/useFetch";
import { useToast } from "../../components/hooks/useToast";
import { ToastContainer } from "../../components/ui/toast";

import {
  ElementsForm,
  FieldName,
  CardElement,
} from "@getopenpay/openpay-js-react";
import { FC, PropsWithChildren, useEffect, useState } from "react";

interface InputProps {
  type?: string;
  placeholder: string;
  openPayId?: FieldName;
}

const Input: FC<InputProps> = ({ type, placeholder, openPayId }) => (
  <input
    type={type ?? "text"}
    placeholder={placeholder}
    className="w-full text-sm bg-transparent outline-none py-2"
    data-opid={openPayId}
  />
);

const StyledWrapper: FC<PropsWithChildren> = ({ children }) => (
  <div className="bg-emerald-50 dark:bg-emerald-800 shadow-md px-4 py-2 rounded-md mb-2">
    {children}
  </div>
);

const HorizontalRule: FC = () => (
  <hr className="border-emerald-200 dark:border-emerald-700" />
);

// Set this to true if you want to use staging, otherwise false for production
const isStagingEnv = true;

export default function CheckoutForm() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const [secureToken, setSecureToken] = useState<string | null>(null);

  const { fetchdata } = useFetch();
  const { toasts, showToast, removeToast } = useToast();

  const onLoad = (totalAmountAtoms?: number) => {
    if (totalAmountAtoms) {
      setAmount(`$${(totalAmountAtoms / 100).toFixed(2)}`);
    }
  };

  const onCheckoutError = (message: string) => {
    setError(message);
    showToast("Payment failed. Please try again.", "error");
  };

  const onCheckoutSuccess = (
    invoiceUrls: string[],
    subscriptionIds: string[],
    customerId: string,
  ) => {
    try {
      // Safely extract and log the data without circular references
      const safeInvoiceUrls = Array.isArray(invoiceUrls) ? invoiceUrls : [];
      const safeSubscriptionIds = Array.isArray(subscriptionIds)
        ? subscriptionIds
        : [];
      const safeCustomerId = typeof customerId === "string" ? customerId : "";

      console.log("✅ Checkout successful!");
      console.log("📄 Invoice URLs:", safeInvoiceUrls);
      console.log("🔗 Subscription IDs:", safeSubscriptionIds);
      console.log("👤 Customer ID:", safeCustomerId);

      // Show success toast
      showToast("Payment successful! Thank you for your purchase.", "success");
      setError(undefined);
    } catch (error) {
      console.log(
        "✅ Checkout successful, but could not log details due to circular references",
      );
      showToast("Payment successful! Thank you for your purchase.", "success");
      setError(undefined);
    }
  };

  useEffect(() => {
    fetchdata({
      url: "http://localhost:3001/checkout/session",
      method: "POST",
      onSuccess: async (response: Response) => {
        const { secure_token } = await response.json();
        setSecureToken(secure_token);
        console.log("✅ secureToken:", secure_token);
      },
      onFailure: () => {
        setError("Failed to initialize payment session.");
        showToast(
          "Failed to initialize payment session. Please try again.",
          "error",
        );
      },
    });
  }, []);

  // 🔑 Don't render ElementsForm until token is ready
  if (!secureToken) {
    return <p className="text-center text-gray-500">Loading payment form…</p>;
  }

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <ElementsForm
        baseUrl={isStagingEnv ? "https://cde.openpaystaging.com" : undefined}
        checkoutSecureToken={secureToken} // only pass real token
        onChange={() => setError(undefined)}
        onLoad={onLoad}
        onValidationError={setError}
        onCheckoutSuccess={onCheckoutSuccess}
        onCheckoutError={onCheckoutError}
      >
        {({ submit }: { submit: () => void }) => (
          <>
            <StyledWrapper>
              <div className="flex gap-2 items-center justify-between">
                <Input
                  placeholder="Given name"
                  openPayId={FieldName.FIRST_NAME}
                />
                <Input
                  placeholder="Family name"
                  openPayId={FieldName.LAST_NAME}
                />
              </div>
              <HorizontalRule />
              <Input
                placeholder="Email"
                type="email"
                openPayId={FieldName.EMAIL}
              />
              <HorizontalRule />
              <div className="flex gap-2 items-center justify-between">
                <Input placeholder="Country" openPayId={FieldName.COUNTRY} />
                <Input placeholder="ZIP" openPayId={FieldName.ZIP_CODE} />
              </div>
            </StyledWrapper>

            <StyledWrapper>
              <CardElement />
            </StyledWrapper>

            {error && (
              <small className="font-bold text-xs mt-2 text-red-500">
                {error}
              </small>
            )}

            <button
              type="button"
              onClick={() => submit()}
              className="px-4 py-2 mt-2 w-full font-bold rounded-lg bg-emerald-500 text-white hover:bg-emerald-400 active:bg-emerald-600"
            >
              Pay {amount ?? ""}
            </button>
          </>
        )}
      </ElementsForm>
    </>
  );
}
