import { NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe';

export async function POST(request: Request) {
    try {
        const { priceId, email, userId } = await request.json();

        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            metadata: {
                user_id: userId,
            },
            customer_email: email,
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                },
                {
                    price: 'price_1PtVk706lW6XZwkvjHkjZaKw',
                    quantity: 1,
                }
            ],
            mode: 'subscription',
            return_url: `${request.headers.get('origin')}/return?session_id={CHECKOUT_SESSION_ID}`,
        });

        return NextResponse.json({ id: session.id, client_secret: session.client_secret })
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}