import { redirect } from 'next/navigation';
import { TCG_APP_SIGNUP_CLIENT_URL } from '../../../../lib/tcgAppUrls';

export default function MarketplaceProviderRegisterPage() {
  redirect(TCG_APP_SIGNUP_CLIENT_URL);
}
