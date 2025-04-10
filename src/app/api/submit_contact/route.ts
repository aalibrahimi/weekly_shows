import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        console.log('Recieved contact form Submission', data);
        return NextResponse.json({message: 'success'});
    } catch (error) {
        console.error('Errror processing contact form:', error);
        return NextResponse.json(
            {error: 'failed to process form submission'},
            { status: 500}
        );
    }
}