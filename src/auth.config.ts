import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';
import bcrypt from 'bcryptjs';

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/profile');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl));
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.data = user;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = token.data as any;
            }
            return session;
        }
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) {
                    return null;
                }
                const { email, password } = parsedCredentials.data;
                // buscar el correo
                const user = await prisma.user.findUnique({
                    where: { email: email.toLocaleLowerCase() }
                })

                if (!user) {
                    return null
                }
                // Comparar contraseñas
                if (!bcrypt.compareSync(password, user.password)) {
                    return null;
                }
                const { password: _, ...rest } = user;
                return rest;
            }
        })




    ],
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)