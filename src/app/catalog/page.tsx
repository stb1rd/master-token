import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

export default async function Index() {
  const supabase = createClientComponentClient();
  const { data: products } = await supabase.from('products').select();

  return (
    <>
      <ul className="my-auto text-foreground">
        {products?.map((product) => (
          <li key={product.id}>
            <Link href={`/catalog/${product.id}`}>
              {product.name} , price: {product['price_info.total_price'] / 100}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
