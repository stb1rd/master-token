import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });
  const { data: products } = await supabase.from('products').select();

  return (
    <>
      <ul className="my-auto text-foreground">
        {products?.map((product) => (
          <li key={product.id}>
            {product.name} , price: {product['price_info.total_price'] / 100}
          </li>
        ))}
      </ul>
    </>
  );
}
