import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import parse from 'html-react-parser';
import { ProductPage } from '@/components/ProductPage';

export default async function Home({ params }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: products } = await supabase.from('products').select().eq('id', params.id);
  const product = products?.[0];

  return <ProductPage product={product} />;
}
