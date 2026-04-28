import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || '',
    key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export async function POST(request: Request) {
    console.log('--- Razorpay Order Request Received ---');
    try {
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            console.error('RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing from environment variables');
            return NextResponse.json({ error: 'Razorpay keys not configured on server' }, { status: 500 });
        }

        const body = await request.json();
        const { amount, currency = 'INR' } = body;
        console.log('Amount:', amount, 'Currency:', currency);

        if (!amount) {
            return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
        }

        const options = {
            amount: amount * 100, // Razorpay expects amount in paise
            currency,
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        console.log('Razorpay Order Created Successfully:', order.id);
        return NextResponse.json(order);
    } catch (error: any) {
        console.error('Error in create-order API:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
