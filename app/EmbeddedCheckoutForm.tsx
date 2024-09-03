"use client";

import { loadStripe } from "@stripe/stripe-js";
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from "@stripe/react-stripe-js";
import { useCallback, useRef, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import toast from "react-hot-toast";

export default function EmbeddedCheckoutButton() {
    const stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
    const [showCheckout, setShowCheckout] = useState(false);
    const modalRef = useRef<HTMLDialogElement>(null);

    const fetchClientSecret = useCallback(async () => {
        const { data } = await supabase.auth.getUser();

        if (!data?.user) {
            toast.error("Please log in to create a new Stripe Checkout session");
            setShowCheckout(false);
            modalRef.current?.close();
            return;
        } else {
            return fetch("/api/embedded-checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ priceId: "price_1PtVGv06lW6XZwkvFQAUL4Q5", userId: data.user?.id, email: data.user?.email }),
            })
            .then((res) => res.json())
            .then((data) => data.client_secret);
        }
    }, [])

    const options = { fetchClientSecret };

    const handleCheckoutClick = () => {
        setShowCheckout(true);
        modalRef.current?.showModal();
    };

    const handleCloseModal = () => {
        setShowCheckout(false);
        modalRef.current?.close();
    };

    return (
        <div id="checkout" className="my-4">
            <button className="btn" onClick={handleCheckoutClick}>
                Try Embedded Checkout
            </button>
            <dialog ref={modalRef} className="modal">
                <div className="modal-box w-100 max-w-screen-2xl">
                    <h3 className="font-bold text-lg">Embedded Checkout</h3>
                    <div className="py-4">
                        {showCheckout && (
                            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                                <EmbeddedCheckout />
                            </EmbeddedCheckoutProvider>
                        )}
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn" onClick={handleCloseModal}>
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}