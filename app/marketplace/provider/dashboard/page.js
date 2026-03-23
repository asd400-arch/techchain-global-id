import { redirect } from 'next/navigation';
import { TCG_APP_LOGIN_URL } from '../../../../lib/tcgAppUrls';

export default function MarketplaceProviderDashboardPage() {
  redirect(TCG_APP_LOGIN_URL);
}
