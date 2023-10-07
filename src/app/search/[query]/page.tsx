import { SearchPage } from '@/components/SearchPage';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Home({ params }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: products } = await supabase
    .from('products')
    .select()
    .ilike('name', `%${decodeURIComponent(params.query)}%`);

  return <SearchPage defaultQuery={decodeURIComponent(params.query)} defaultProducts={products} />;
}
