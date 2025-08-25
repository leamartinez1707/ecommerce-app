'use server'

import { signIn } from "@/auth.config"
import { sleep } from "@/utils";

export const authenticate = async (prevState: string | undefined, formData: FormData,) => {
    try {
        sleep(2000)
        await signIn('credentials', {
            redirect: false,
            ...Object.fromEntries(formData)
        });
        return 'Success'
    } catch (error) {
        if ((error as { code?: string })?.code === 'credentials') {
            return 'CredentialsSignin'
        }
        return 'Error desconocido'
    }
}