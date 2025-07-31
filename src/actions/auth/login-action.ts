'use server'

import { signIn } from "@/auth.config"

export const authenticate = async (prevState: string | undefined, formData: FormData,) => {
    try {
        await signIn('credentials', Object.fromEntries(formData));
    } catch (error) {
        // if ((error as Error).message === 'CredentialsSignin') {
        return 'Invalid credentials'
        // }
        // throw error;
    }
}