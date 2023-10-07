import { SearchPage } from '@/components/SearchPage';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: products } = await supabase.from('products').select();

  return <SearchPage defaultQuery={''} defaultProducts={products} />;
}
