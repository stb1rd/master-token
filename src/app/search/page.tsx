import { SearchPage } from '@/components/SearchPage';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default async function Home() {
  const supabase = createClientComponentClient();
  const { data: products } = await supabase.from('products').select();

  return <SearchPage defaultQuery={''} defaultProducts={products} />;
}
