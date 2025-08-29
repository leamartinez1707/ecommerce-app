import { Title } from '@/components';
import AddressForm from './ui/AddressForm';
import { getCountries } from '@/actions/country/get-countries';
import { auth } from '@/auth.config';
import { getUserAddress } from '@/actions/address/get-user-address';

export default async function AddressPage() {
  const countries = await getCountries();

  const session = await auth();
  if (!session?.user) return <h3 className='text-4xl'>400 - No hay una sesión activa</h3>
  const { address, address2 } = await getUserAddress(session.user.id)

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />
        <AddressForm countries={countries} userStoredAddress={address} address2={address2} />
      </div>
    </div>
  );
}