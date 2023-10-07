'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { ProductCard } from './ProductCard';

export const SearchPage = ({ defaultQuery, defaultProducts }: any) => {
  const [query, setQuery] = useState(defaultQuery);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <div className="flex flex-col gap-5">
      <form className="flex flex-row gap-4 w-full" action={`/search/${query}`}>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Check the history of NFT/art/person"
            className="input input-bordered w-full"
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current.focus();
            }}
            className="btn btn-sm btn-ghost absolute right-0 top-0 h-full"
          >
            <ClearIcon className="text-gray-400" />
          </button>
        </div>
        <button className="btn btn-primary">
          <div className="flex flex-row gap-2 items-center">
            <SearchIcon />
            <span>Search</span>
          </div>
        </button>
      </form>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>Search</li>
        </ul>
      </div>
      {defaultProducts?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
