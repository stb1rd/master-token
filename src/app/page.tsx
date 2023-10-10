import { Search } from '@/components/SearchMain';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <div className="hero min-h-screen -my-8">
        <div className="hero-content text-center w-full max-w-xl">
          <div className="flex flex-col w-full items-center gap-4">
            <Image src="/icon-192.png" alt="NFT Logo" width={128} height={128} priority />
            <h1 className="text-5xl font-bold">MasterNFT</h1>
            <p className="text-2xl">the live history of any art/nft object</p>
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
}
