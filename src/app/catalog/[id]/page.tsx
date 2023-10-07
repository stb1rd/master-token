import { ProductPage } from '@/components/ProductPage';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default async function Home({ params }) {
  const supabase = createClientComponentClient();
  const { data: products } = await supabase.from('products').select().eq('id', params.id);
  const product = products?.[0];

  return <ProductPage product={product} />;
}
