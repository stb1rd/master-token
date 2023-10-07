'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

export const Search = () => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <>
      <form className="flex flex-row gap-4 w-full mt-10" action={`/search/${query}`}>
        <input
          type="text"
          placeholder="Check the history of NFT/art/person"
          className="input input-bordered w-full"
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary">
          <div className="flex flex-row gap-2 items-center">
            <SearchIcon />
            <span>Search</span>
          </div>
        </button>
      </form>
      <div className="flex flex-row gap-2">
        <Link href={`/search/ALEX NOW`}>
          <button className="btn btn-ghost btn-sm">Digital</button>
        </Link>
        <Link href={`/search/VENUS de Milo`}>
          <button className="btn btn-ghost btn-sm">Art</button>
        </Link>
        <Link href={`/search/SUSTAINABLE HOME`}>
          <button className="btn btn-ghost btn-sm">Apartments</button>
        </Link>
      </div>
    </>
  );
};
