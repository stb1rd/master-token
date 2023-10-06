'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useCallback, useState } from 'react';

export const Search = () => {
  const [query, setQuery] = useState('');
  const [queryResults, setQueryResults] = useState([]);
  const supabase = createClientComponentClient();

  const getQueryData = useCallback(
    async (input) => {
      setQuery(input);
      if (input.length === 0) {
        setQueryResults([]);
        return;
      }
      try {
        const { data } = await supabase.from('products').select().ilike('name', `%${input}%`);
        setQueryResults(data);
      } catch (e) {
        console.log(e);
      }
    },
    [supabase]
  );

  return (
    <>
      <input type="text" value={query} onChange={(e) => getQueryData(e.target.value)} className="border-2 border-black-600" />
      <Link href={`/search/${query}`}>see results</Link>
      <div>quick results</div>
      <ul className="my-auto text-foreground">
        {queryResults?.map((product) => (
          <li key={product.id}>
            <Link href={`/catalog/${product.id}`}>
              {product.name} , price: {product['price_info.total_price'] / 100}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
