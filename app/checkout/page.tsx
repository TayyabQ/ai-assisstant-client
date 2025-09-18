"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
  className?: string;
  placeholder: string;
  openPayId?: FieldName;
}

const Input: FC<InputProps> = ({ type, className, placeholder, openPayId }) => (
  <input
    type={type ?? "text"}
    placeholder={placeholder}
    className={`w-full text-sm bg-transparent outline-none py-2 ${className}`}
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
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { fetchdata } = useFetch();
  const { toasts, showToast, removeToast } = useToast();

  const { data } = useSession();
  console.log(data);
  const accessToken = data?.accessToken;
  console.log(accessToken);

  const errorMessages: Record<string, string> = {
    cardExpiry: "Your card has expired. Please use a valid card.",
    cardNumber: "The card number you entered is invalid.",
    cvv: "The security code (CVV) is incorrect.",
    email: "Please enter a valid email address.",
    firstName: "First name is required.",
    lastName: "Last name is required.",
    zipCode: "Please enter a valid ZIP code.",
    country: "Please select your country.",
  };

  const onLoad = (totalAmountAtoms?: number) => {
    if (totalAmountAtoms) {
      setAmount(`$${(totalAmountAtoms / 100).toFixed(2)}`);
    }
  };

  const onCheckoutError = (message: string) => {
    setLoading(false);
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
      setLoading(false);
      showToast("Payment successful! Thank you for your purchase.", "success");
      setError(undefined);
      router.push("/dashboard");
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
      token: accessToken,
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
      <div className="min-h-screen flex items-center justify-center">
        <ElementsForm
          baseUrl={isStagingEnv ? "https://cde.openpaystaging.com" : undefined}
          checkoutSecureToken={secureToken} // only pass real token
          onChange={() => setError(undefined)}
          onLoad={onLoad}
          onValidationError={(errKey: string) => {
            const message =
              errorMessages[errKey] || "Invalid input. Please check again.";
            setError(message);
          }}
          onCheckoutSuccess={onCheckoutSuccess}
          onCheckoutError={onCheckoutError}
          className="w-[300px] sm:w-[500px] md:w-[600px] lg:w-[750px] xl:w-[1000px] 2xl:w-[1200px] mx-auto"
        >
          {({ submit }: { submit: () => void }) => (
            <>
              <StyledWrapper>
                <div className="flex gap-2 items-center justify-between">
                  <Input
                    className="p-2"
                    placeholder="Given name"
                    openPayId={FieldName.FIRST_NAME}
                  />
                  <Input
                    className="p-2"
                    placeholder="Family name"
                    openPayId={FieldName.LAST_NAME}
                  />
                </div>
                <HorizontalRule />
                <Input
                  className="p-2"
                  placeholder="Email"
                  type="email"
                  openPayId={FieldName.EMAIL}
                />
                <HorizontalRule />
                <div className="flex gap-2 items-center justify-between">
                  <Input
                    className="p-2"
                    placeholder="Country"
                    openPayId={FieldName.COUNTRY}
                  />
                  <Input
                    className="p-2"
                    placeholder="ZIP"
                    openPayId={FieldName.ZIP_CODE}
                  />
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
                disabled={loading}
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => submit(), 2000);
                }}
                className="px-4 py-2 mt-2 w-full font-bold rounded-lg bg-emerald-500 text-white hover:bg-emerald-400 active:bg-emerald-600"
              >
                {loading ? (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                      <img
                        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnY3NmZtM2xlem5oN29tNGV1Nmt6dHpraHN3aTE4bzM0Nmo5dHFicyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/17mNCcKU1mJlrbXodo/giphy.gif"
                        alt="Loading"
                        className="w-16 h-16 mb-4"
                      />
                      {/* <p className="font-semibold text-emerald-600">Processing Payment…</p> */}
                    </div>
                  </div>
                ) : (
                  <>Pay {amount ?? ""}</>
                )}
              </button>
            </>
          )}
        </ElementsForm>
      </div>
    </>
  );
}
