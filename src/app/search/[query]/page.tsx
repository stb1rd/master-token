import { SearchPage } from '@/components/SearchPage';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default async function Home({ params }) {
  const supabase = createClientComponentClient();
  const { data: products } = await supabase
    .from('products')
    .select()
    .ilike('name', `%${decodeURIComponent(params.query)}%`);

  return <SearchPage defaultQuery={decodeURIComponent(params.query)} defaultProducts={products} />;
}
