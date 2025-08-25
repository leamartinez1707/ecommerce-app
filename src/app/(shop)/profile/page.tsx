import { auth } from '@/auth.config'
import { Title } from '@/components'
import { redirect } from 'next/navigation';

const ProfilePage = async () => {
    const session = await auth();
    if (!session?.user) {
        redirect("/auth/login");
    }
    return (
        <div>
            <Title title='Perfil' />

            <pre>{JSON.stringify(session.user, null, 2)}</pre>
        </div>
    )
}

export default ProfilePage