import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const { data: items } = await supabase.from('items').select();

  return (
    <>
      <ul className="my-auto text-foreground">
        {items?.map((item) => (
          <li key={item.id}>
            {item.name} , price: {item['price_info.total_price'] / 100}
          </li>
        ))}
      </ul>
    </>
  );
}
