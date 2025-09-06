'use server'

export const paypalCheckPayment = async (transactionId: string) => {

    try {

        const authToken = await getPaypalBearToken();
        if (!authToken) {
            return {
                ok: false,
                message: 'No auth token'
            }
        }
        console.log({ authToken })
        return {
            ok: true,
            authToken
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Error checking payment'
        }
    }

}


const getPaypalBearToken = async (): Promise<string | null> => {
    const url = process.env.PAYPAL_OAUTH_URL ?? "";

    const base64token = Buffer.from(`${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`, 'utf-8').toString('base64');


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", "Basic " + base64token);

    const urlEncoded = new URLSearchParams();
    urlEncoded.append("grant_type", "client_credentials");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlEncoded,
    };

    try {

        const result = await fetch(url, requestOptions).then(res => res.json());
        return result.access_token;
    } catch (error) {
        console.error(error);
        return null;
    }
}